import { Client } from 'ldapts'
import { getEnv } from './common/util'

export const ldapConfig = {
  url: getEnv('LDAP_URL'),
  baseDn: getEnv('LDAP_BASE_DN'),
  adminPassword: getEnv('LDAP_ADMIN_PASSWORD'),
  fieldLeaderDn: getEnv('LDAP_LEADER_DN'),
}

export async function getLdapClient(): Promise<Client> {
  const client = new Client({
    url: ldapConfig.url,
  })

  await client.bind(`cn=admin,${ldapConfig.baseDn}`, ldapConfig.adminPassword)

  return client
}
