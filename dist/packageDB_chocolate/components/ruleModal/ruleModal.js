Component({


  methods: {
    closeModal() {
      this.triggerEvent("closeRule", 'showRule')
    }
  }
})