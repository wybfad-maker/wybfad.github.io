export default function useDataEffect (data, callback) {
  const [dataState, setDataState] = reactive({
    data: data,
    loading: false,
    error: null,
  })

  watchEffect(() => {
    if (dataState.loading) return
    setDataState({
      ...dataState,
      loading: true
    })
    callback(dataState.data)
      .then((res) => {
        setDataState({
          ...dataState,
          data: res,
          loading: false
        })
      })
      .catch((err) => {
        setDataState({
          ...dataState,
          error: err,
          loading: false
        })
      })
  })

  return dataState
}
// 使用示例
// const dataState = useDataEffect(data, callback)
// dataState.loading
// dataState.data
// dataState.error