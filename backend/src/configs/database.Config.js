import {connect} from "mongoose"

export const dbConnect=()=>{
    connect(process.env.MONGO_URI,{
        // useNewParserUrl:true,
        useUnifiedTopology:true,
    }).then(
        () => console.log("connect successfully"),
        (error) => console.log(error)
    )
}

