// import Vue from 'vue'
import { mapState } from 'vuex'
import { deviceEnquire, DEVICE_TYPE } from '@/lin/util/device'

const mixinDevice = {
  computed: {
    ...mapState({
      device: state => state.device,
    }),
  },
  methods: {
    isMobile() {
      return this.device === DEVICE_TYPE.MOBILE
    },
    isDesktop() {
      return this.device === DEVICE_TYPE.DESKTOP
    },
    isTablet() {
      return this.device === DEVICE_TYPE.TABLET
    },
  },
}

const AppDeviceEnquire = {
  mounted() {
    const { $store } = this
    deviceEnquire(deviceType => {
      switch (deviceType) {
        case DEVICE_TYPE.DESKTOP:
          $store.commit('TOGGLE_DEVICE', 'desktop')
          break
        case DEVICE_TYPE.TABLET:
          $store.commit('TOGGLE_DEVICE', 'tablet')
          break
        case DEVICE_TYPE.MOBILE:
        default:
          $store.commit('TOGGLE_DEVICE', 'mobile')
          break
      }
    })
  },
}

export { AppDeviceEnquire, mixinDevice }
