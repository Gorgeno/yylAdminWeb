<script>
export default {
  data() {
    return {}
  },
  created() {
    const { params, query } = this.$route
    const { path } = params
    this.$router.replace({ path: '/' + path, query }).catch(() => {})
  },
  render: function(h) {
    return h()
  }
}
</script>
