/* eslint-disable indent */
// import { slugify } from '../helpers/handyFuncs'
export default {
    // this getter is to check whether use finished step 1
    isFinishedStep1: state => {
      return state.business.name.trim() !== '' && (Object.keys(state.business.category).length !== 0)
    },
    // get an array of service value
    // getServiceValuesArr: state => {
    //   let svs = state.services
    //   return svs.reduce((option, item) => {
    //     if (item.name !== '') {
    //       option.push(slugify(item.name))
    //     }
    //     return option
    //   }, [])
    // },
    // Get service options with label and value
    getServiceOptions: state => {
      const svs = state.services
      return svs.reduce((option, item) => {
        if (item.name !== '') {
          option.push({
            'label': item.name,
            'value': item.id
          })
        }
        return option
      }, [])
    }
  }
