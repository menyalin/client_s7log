export default {
  state: {
    partners: [
      { _id: '0001', name: 'ООО Конфеты', address: 'МО, Крекшино' },
      { _id: '0002', name: 'ООО Конфеты', address: 'МО, Ногинск' },
      { _id: '0003', name: 'ООО Конфеты', address: 'МО, Химки, адрес склада' },
      { _id: '0004', name: 'ООО Конфеты', address: 'МО, Крекер, адрес склада' },
      { _id: '0005', name: 'ООО Конфеты', address: 'Москва, Красный октябрь' },
      { _id: '0006', name: 'ООО Курица', address: 'МО, Константиново' },
      { _id: '0007', name: 'ООО Курица', address: 'МО, Часцы' },
      { _id: '0008', name: 'ООО Дикси', address: 'МО, Всходы' },
      { _id: '0009', name: 'ООО Дикси', address: 'МО, Внуково' },
      { _id: '0010', name: 'Перекресток', address: 'МО, Видное' }
    ],
    vehicleType: [
      { value: '10tn', text: '10тн' },
      { value: '20tn', text: '20тн' }
    ]
  },
  mutations: {
  },
  actions: {
  },
  getters: {
    partnersForAutocomplite: ({ partners }) => {
      return partners.map(item => ({
        value: item._id,
        text: item.address + ' - <' + item.name + '>'
      }))
    },
    vehicleType: (state) => state.vehicleType
  }
}
