const mongoose = require("mongoose")

const jobSchema = new mongoose.Schema(
    {
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },
        company:{
            type:String,
            required:true,
        },
        role:{
            type:String,
            required:true,
        },
        status:{
            type:String,
            enum:["Applied", "Screening", "Interview", "Offer", "Rejected"],
            default:"Applied",
        },
        source:{
            type:String,
            enum:["LinkedIn", "Naukri", "Indeed", "Internshala", "Company Website", "Referral", "Other"],
            default:"LinkedIn"
        },
        jobLink:{
            type:String,
            default:"",
        },
        notes:{
            type:String,
            default:"",
        },
        appliedDate:{
            type:Date,
            default:Date.now,
        },
    },
    { timestamps : true }
);

module.exports = mongoose.model("job",jobSchema)