import axios from '../../src/index'

axios({
  method: 'get',
  url: '/simple/get',
  data: {
    a: 1,
    b: 2
  }
})
