const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.userInfo.staffPhoto,//用户头像
  name: state => state.user.userInfo.username,//用户名称
  userId:state => state.user.userInfo.userId,//用户Id

}
export default getters
