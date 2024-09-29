<script setup lang="ts">
import type DataTable from 'primevue/datatable'
import type {
  DataTableFilterMeta,
  DataTableFilterMetaData,
} from 'primevue/datatable'
import type { Application, ApplicationStatus } from '~/types/api'

const store = useApplicationsStore()
await useAsyncData('applications', () => store.fetchApplications())

const formattedApplications = computed(() =>
  store.applications.map((appl) => ({
    ...appl,
    created: new Date(appl.created).toLocaleDateString(),
    fields: appl.fields.map((f) => f.name).join(', '),
  }))
)

const dataTable = useTemplateRef<InstanceType<typeof DataTable>>('data-table')

const selected = ref<Application[]>()
const target = ref<Application>()
const acceptDialog = ref(false)
const declineDialog = ref(false)
const deleteDialog = ref(false)

const statusOptions = ref(['pending', 'accepted', 'declined'])
const filters = ref<DataTableFilterMeta>({
  global: { value: '', matchMode: 'contains' },
  status: { value: '', matchMode: 'equals' },
})

function getFilterData(name: string): DataTableFilterMetaData {
  return filters.value[name] as DataTableFilterMetaData
}

function getSeverity(status: ApplicationStatus): string {
  switch (status) {
    case 'pending':
      return 'info'
    case 'accepted':
      return 'success'
    case 'declined':
      return 'danger'
  }
}

function confirmDeleteSelected(): void {
  deleteDialog.value = true
}

function confirmDecline(application: Application): void {
  target.value = application
  declineDialog.value = true
}

function confirmAccept(application: Application): void {
  target.value = application
  acceptDialog.value = true
}

async function changeStatus(status: ApplicationStatus): Promise<void> {
  if (target.value) {
    await store.setApplicationStatus(target.value, status)
    acceptDialog.value = false
  }
}
</script>

<template>
  <div>
    <Card class="m4">
      <template #content>
        <Toolbar class="!p4">
          <template #start>
            <Button label="New" icon="pi pi-plus" class="mr-4" />
            <Button
              label="Delete"
              icon="pi pi-trash"
              severity="danger"
              outlined
              :disabled="!selected || !selected.length"
              @click="confirmDeleteSelected()"
            />
          </template>
          <template #end>
            <div class="hidden md:block">
              <Button
                label="Export"
                icon="pi pi-upload"
                severity="secondary"
                @click="dataTable?.exportCSV()"
              />
            </div>
          </template>
        </Toolbar>

        <DataTable
          ref="data-table"
          v-model:filters="filters"
          v-model:selection="selected"
          :value="formattedApplications"
          filter-display="menu"
          removable-sort
          sort-mode="multiple"
          paginator
          :rows="15"
          :rows-per-page-options="[5, 15, 25]"
        >
          <template #header>
            <div class="flex flex-wrap items-center justify-between gap-2">
              <span class="text-xl font-bold">Applications</span>
              <IconField>
                <InputIcon>
                  <i class="pi pi-search" />
                </InputIcon>
                <InputText
                  v-model="getFilterData('global').value"
                  placeholder="Search"
                />
              </IconField>
            </div>
          </template>

          <template #empty>No applications found.</template>

          <Column selection-mode="multiple" />
          <Column field="status" header="Status" sortable>
            <template #body="{ data }">
              <Tag :value="data.status" :severity="getSeverity(data.status)" />
            </template>
            <template #filter="{ filterModel }">
              <Select
                v-model="filterModel.value"
                placeholder="Select one"
                :options="statusOptions"
              >
                <template #option="slotProps">
                  <Tag
                    :value="slotProps.option"
                    :severity="getSeverity(slotProps.option)"
                  />
                </template>
              </Select>
            </template>
          </Column>
          <Column field="firstName" header="First name" sortable />
          <Column field="lastName" header="Last name" sortable />
          <Column field="course.name" header="Course" sortable />
          <Column field="semester" header="Semester" sortable />
          <Column field="degree" header="Degree" sortable />
          <Column field="fields" header="Fields" sortable />
          <Column field="created" header="Created" sortable />
          <Column :exportable="false">
            <template #body="slotProps">
              <div class="flex gap-2">
                <Button
                  icon="pi pi-check"
                  outlined
                  severity="success"
                  :disabled="slotProps.data.status !== 'pending'"
                  @click="confirmAccept(slotProps.data)"
                />
                <Button
                  icon="pi pi-times"
                  outlined
                  severity="danger"
                  :disabled="slotProps.data.status !== 'pending'"
                  @click="confirmDecline(slotProps.data)"
                />
              </div>
            </template>
          </Column>
        </DataTable>
      </template>
    </Card>

    <ConfirmationDialog
      v-model:visible="acceptDialog"
      @confirm="changeStatus('accepted')"
    >
      <span>
        Are you sure you want to <b> accept </b> the application of
        <b> {{ target?.firstName }} {{ target?.lastName }} </b>?
      </span>
    </ConfirmationDialog>

    <ConfirmationDialog
      v-model:visible="declineDialog"
      @confirm="changeStatus('declined')"
    >
      <span>
        Are you sure you want to <b> decline </b>the application of
        <b> {{ target?.firstName }} {{ target?.lastName }} </b>?
      </span>
    </ConfirmationDialog>

    <ConfirmationDialog v-model:visible="deleteDialog">
      <span>
        Are you sure you want to delete
        <b> all selected </b> applications?
      </span>
    </ConfirmationDialog>
  </div>
</template>
