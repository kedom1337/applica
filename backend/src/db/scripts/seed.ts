import { db } from '../db'
import { courses, fields, applications, applicationsFields } from '../schema'

async function seedDatabase(): Promise<void> {
  try {
    console.log('seeding database...')
    const insertedCourses = await db
      .insert(courses)
      .values([
        { name: 'Computer Science' },
        { name: 'Mechanical Engineering' },
        { name: 'Business Administration' },
      ])
      .returning()

    const insertedFields = await db
      .insert(fields)
      .values([
        { name: 'Driverless' },
        { name: 'Robotics' },
        { name: 'Marketing' },
      ])
      .returning()

    const insertedApplications = await db
      .insert(applications)
      .values([
        {
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          phone: '1234567890',
          courseId: insertedCourses[0].id,
          semester: 2,
          degree: 'BSc',
          experience: 'Some experience in coding',
          status: 'pending',
          messaged: true,
          talked: false,
          clubBriefed: true,
          securityBriefed: false,
          information: 'John is interested in AI projects',
        },
        {
          firstName: 'Jane',
          lastName: 'Smith',
          email: 'jane.smith@example.com',
          phone: '9876543210',
          courseId: insertedCourses[1].id,
          semester: 4,
          degree: 'MSc',
          experience: 'Experience in Robotics',
          status: 'accepted',
          messaged: true,
          talked: true,
          clubBriefed: true,
          securityBriefed: true,
          information: 'Jane is already part of the robotics team',
        },
      ])
      .returning()

    await db.insert(applicationsFields).values([
      {
        applicationId: insertedApplications[0].id,
        fieldId: insertedFields[0].id,
      },
      {
        applicationId: insertedApplications[1].id,
        fieldId: insertedFields[0].id,
      },
      {
        applicationId: insertedApplications[1].id,
        fieldId: insertedFields[1].id,
      },
    ])

    console.log('seeding completed successfully')
  } catch (err) {
    console.error(err)
    process.exit(1)
  }

  process.exit()
}

seedDatabase()
