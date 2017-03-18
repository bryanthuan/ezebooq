import { sortDays } from '../helpers/handyFuncs'

const mutations = {
  onAuthStateChanged: (state, { user }) => {
    state.user = user
  },
  /** Service Name */
  updateServiceName: (state, value) => {
    // let originalVal = state.services[value.index].name
    // let originalId = state.services[value.index].id
    state.services[value.index].name = value.name
    // Keep this one this for later comperision.
    // let oldItem = {
    //   'label': originalVal,
    //   'value': slugify(originalVal)
    // }
    // TODO: We can change newItem = 'value' once keen ui finished testing on safary.
    // let newItem = {
    //   'label': value.name,
    //   'value': originalId
    // }
    // // Find in all staffs
    // state.staffs.forEach((staff, staffIndex) => {
    //   // find in any staff that has service is just changed
    //   state.staffs[staffIndex].services.forEach((service, serviceIndex) => {
    //     if (service.label === originalVal) {
    //       state.staffs[staffIndex].services[serviceIndex] = newItem
    //     }
    //   })
    // })
  },
  /** Service Name Touched */
  updateServiceNameTouched: (state, value) => {
    state.services[value.index].s_touched = value.s_touched
  },
  initServices: (state, value) => {
    state.services = value
  },
  initStaffs: (state, value) => {
    state.staffs = value
  },
  /** Update Service Price */
  updateServicePrice: (state, value) => {
    state.services[value.index].price = value.price
  },
  /** Update Service Duration */
  updateServiceDuration: (state, value) => {
    state.services[value.index].duration = value.duration
  },
  /** Update Service Desc */
  updateServiceDesc: (state, value) => {
    state.services[value.index].description = value.description
  },
  /** Add Service Form */
  addService: (state, value) => {
    state.services.push(value)
  },
  /** Remove Service Form */
  removeService: (state, key) => {
    const index = state.services.findIndex(item => {
      return item.id === key
    })
    state.services.splice(index, 1)

    // TODO: also remove any assigned services to staffs
    state.staffs.forEach(staff => {
      staff.services.splice(index, 1)
    })
  },
  /** Staff Name */
  updateStaffName: (state, value) => {
    state.staffs[value.index].name = value.name
  },
  /** Update Staff Bio */
  updateStaffBio: (state, value) => {
    state.staffs[value.index].short_bio = value.short_bio
  },
  /** Update Staff Assignment */
  updateStaffAssign: (state, value) => {
    state.staffs[value.index].services = value.services
  },
  /** Add Staff Form */
  addStaff: (state, value) => {
    state.staffs.push(value)
  },
  /** Remove Staff Form */
  removeStaff: (state, key) => {
    // state.staffs.splice(value, 1)
    const index = state.staffs.findIndex(item => {
      return item.id === key
    })
    state.staffs.splice(index, 1)
  },
  /** Add  Opening Hour Form */
  addOpeningHour: (state, value) => {
    state.opening_hours.push(value)
  },
  /** Remove Opening Hour Form */
  removeOpeningHour: (state, value) => {
    state.opening_hours.splice(value, 1)
  },
  /** Update Opening days */
  updateOpDow: (state, value) => {
    state.opening_hours[value.index].dow = sortDays(value.dow)
  },

  /** Update Opening Start Time */
  updateOpStart: (state, value) => {
    state.opening_hours[value.index].start = value.start
  },
  /** Update Opening End Time */
  updateOpEnd: (state, value) => {
    state.opening_hours[value.index].end = value.end
  },

  setCurrentUser: (state, value) => {
    state.user = value
  },
  // Update state categories
  updateCategories: (state, value) => {
    state.subcategories = value.subcategories
    state.categories = value.categories
  }
}

export default mutations
