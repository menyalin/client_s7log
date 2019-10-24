<template>
  <div>
    <app-document-list-form :items="drivers" :fields="fields"/>
  </div>
</template>

<script>
  import appDocumentListForm from '@/components/common/documentListForm/index.vue'

  export default {
    data: () => ({
      drivers: [
        { _id: '000001', name: 'Иванов Иван Иванович', birthDay: '1990-01-01' },
        { _id: '000002', name: 'Петров Петр Петрович', birthDay: '1974-04-15' },
        {
          _id: '00003233232323232302',
          name: 'Петров Петр Петрович111111111111111111111111',
          birthDay: '1974-04-15'
        }
      ],
      fields: [
        { data: '_id', title: 'ID', cols: '3' },
        { data: 'name', title: 'NAME', cols: '8' },
        { data: 'birthDay', title: 'Birth Day', cols: '1' }
      ]
    }),
    components: {
      appDocumentListForm
    }
  }
</script>
