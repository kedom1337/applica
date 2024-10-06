import { Client } from 'ldapts'
import { getEnvVariable } from './common/util'

export const ldapConfig = {
  url: getEnvVariable('LDAP_URL'),
  baseDn: getEnvVariable('LDAP_BASE_DN'),
  adminPassword: getEnvVariable('LDAP_ADMIN_PASSWORD'),
  fieldLeaderDn: getEnvVariable('LDAP_LEADER_DN'),
}

export async function getLdapClient(): Promise<Client> {
  const client = new Client({
    url: ldapConfig.url,
  })

  await client.bind(`cn=admin,${ldapConfig.baseDn}`, ldapConfig.adminPassword)

  return client
}
