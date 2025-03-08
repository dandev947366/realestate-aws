import * as config from "../config.js"

export const welcome = (req, res) => {
    res.json({
      data: "Hello from nodejs api auth"
    });
};

export const preRegister = async (req, res) => {
  try{
    console.log(req.body)
    config.AWSSES.sendEmail({
      Source: config.EMAIL_FROM,
      Destination: {
        ToAddresses: ["danle947366@gmail.com"]
      },
      Message: {
        Body: {
          Html: {
            Charset: "UTF-8",
            Data: `
              <h1>Welcome to Real Estate AWS</h1>
            `
          }
        },
        Subject: {
          Charset: "UTF-8",
          Data: "Welcome to Real Estate AWS"
        }
      }
    }, (err, data)=>{
      if(err){
        console.log(err)
        return res.json({ok:false, error: err.message })
      }else{
        return res.json({ok:true, message: "Email sent successfully!" })
      }
    })
  }
  catch(err){
    console.log(err)
    return res.json({error: "Somthine went wrong. Try again."})
  }
}