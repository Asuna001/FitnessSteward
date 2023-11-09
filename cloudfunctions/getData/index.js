

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
try{
  const db=cloud.database();
  const result=await db.collection('student').get()
  return result
}catch(err){
  console.error(err)
  return err
}

}