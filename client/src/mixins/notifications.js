const notifications = {
  methods: {
    notifications() {
      const notify = this.$bvToast;
      return {
        success(msg) {
          notify.toast(msg, {
            title: 'Success!',
            variant: 'success',
            solid: true
          })
        },

        failure(msg) {
          notify.toast(msg, {
            title: 'Ooops!',
            variant: 'danger',
            solid: true
          })
        },
      }
    }
  }
}

export default notifications