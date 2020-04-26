export default {
  methods: {
    getHospitalName(hospitalCode) {
      const hospital = this.$config.hospitalDatabase.find(
        h => h.code === hospitalCode
      )
      if (hospital.longName.length < 20) return hospital.longName
      return hospital.shortName
    },
    getHospitalLongName(hospitalCode) {
      return this.$config.hospitalDatabase.find(h => h.code === hospitalCode)
        .longName
    },
    getHospitalLogoPath(hospitalCode) {
      const hospital = this.$config.hospitalDatabase.find(
        h => h.code === hospitalCode
      )
      if (hospital.logoPath) return hospital.logoPath
      return 'img/hospital-logos/hospital-regular.png'
    }
  }
}
