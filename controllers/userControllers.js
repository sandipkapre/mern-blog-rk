const user = require("./../models/User")

exports.getAllUsers = async (req, res) => {
   try {
      const u = await user.findById(req.body.id)
      if (!u.admin) {
         return res.status(401).json({
            success: false,
            message: "wait a min..."
         })
      }
      const result = await user
         .find()
      //  .select("name email _id")
      res.json({
         success: true,
         message: "User Fetched Succefully",
         result
      })
   } catch (error) {
      res.status(400).json({
         success: false,
         message: "error" + error
      })
   }
}
exports.getAllUsersDelete = async (req, res) => {
   try {
      const result = await user
         .deleteMany()
      //  .select("name email _id")
      res.json({
         success: true,
         message: "User deleted Succefully",
         result
      })
   } catch (error) {
      res.status(400).json({
         success: false,
         message: "error" + error
      })
   }
}