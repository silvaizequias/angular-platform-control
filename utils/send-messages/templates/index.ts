import {
  InviteMemberToOrganizationTemplateType,
  NewOrganizationTemplateType,
  WelcomeToThePlatformTemplateType,
} from '../types'

export const emailWelcomeToThePlatform = ({
  name,
  password,
  phone,
}: WelcomeToThePlatformTemplateType) => {
  return `<div>
            <h4>olá <strong>${name.toLowerCase()}</strong>, muito bem vindo a plataforma dedicado!</h4>
            <p>sua conta foi criada e a partir de agora poderá ter acesso a melhor plataforma de serviços.</p>
            <p>com o seu número de telefone <strong>${phone}</strong> acesse <strong>https://dedicado.digital</strong> usando a senha <strong>${password}</strong></p>
            <p>é um prazer ter você por aqui!</p>
        </div>`
}

export const smsWelcomeToThePlatform = ({
  name,
  password,
}: WelcomeToThePlatformTemplateType) => {
  return `${name.toLowerCase()}, sua conta foi criada na plataforma https://dedicado.digital. sua senha de acesso é ${password}`
}

export const emailInviteMemberToOrganization = ({
  member,
  organization,
  role,
}: InviteMemberToOrganizationTemplateType) => {
  return `<div>
            <p><strong>${member.toLowerCase()}</strong>, você foi convidado para participar da organização <strong>${organization.toLowerCase()}</strong> como <strong>${role}</strong>.</p>
            <p>acesse <strong>https://dedicado.digital</strong></p>
        </div>`
}

export const smsInviteMemberToOrganization = ({
  member,
  organization,
  role,
}: InviteMemberToOrganizationTemplateType) => {
  return `${member.toLowerCase()}, você foi convidado para participar da organização ${organization.toLowerCase()} como ${role}. acesse https://dedicado.digital`
}

export const emailNewOrganization = ({
  name,
  organization,
}: NewOrganizationTemplateType) => {
  return `<div>
    <h4>olá <string>${name.toLowerCase()}</string>!</h4>
    <p>sua organização <string>${organization.toLowerCase()}</string> foi criada na plataforma dedicado e agora está pronta para você adiconar membros e utilize nossas soluções.</p>
    <p>estamos felizes em ter você por aqui!</p>
    </div>`
}
