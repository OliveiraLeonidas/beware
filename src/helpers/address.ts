

export const formatAddress = (address: {id: string,
recipientName: string,
street: string,
number: string,
complement: string | null,
neighborhood: string,
city: string,
state: string,
zipCode: string,}) => {
  return `
  ${address.recipientName}\n
  ${address.street}, ${address.number}
  ${address.complement
  ? `, ${address.complement}`
  : ""}
  - ${address.neighborhood}
  ${address.city} - ${address.state}, ${address.zipCode}`
}