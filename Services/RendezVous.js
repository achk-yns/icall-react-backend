const express  = require("express")
const route = express.Router()
const RendezVous = require("../Models/RendezVous")
const localStorage = require('localStorage');
const authMiddleware = require("../middlewares/AuthMiddleware")


route.post('/',authMiddleware,async function(req, res){
    const {NOM , PRENOM , TELEPHONE , ADRESSE} = req.body ; 
    const user_id = req.userId;
    const FindRendezvous =await RendezVous.findOne({NOM,user_id});
    if (!FindRendezvous){
        const newRendezVous = new RendezVous({...req.body,user_id});
        const DataSave = await newRendezVous.save();
        res.status(200).send({message: "Rendez-vous created <3 ", data: DataSave} )
    }
    else{
        res.status(401).send({message: " Rendez vous invalid  or  created before "} )
    }
})



route.get('/',authMiddleware,async (req,res) => {
    const user_id = req.userId  
    const AllData  = await RendezVous.find({user_id});
    if(AllData){
        res.status(200).send({data: AllData})
    }
    else
    {
        res.status(401).send({message: " Aucun Rendez Vous  "} )
    }
})

route.get('/:NOM',authMiddleware,async (req,res) => {
    const {NOM} = req.params 
    const user_id = req.userId  
    const FindRendezvous =await RendezVous.findOne({NOM,user_id});
    if(FindRendezvous){
        res.status(200).send({data: FindRendezvous})
    }
    else{
        res.status(401).send({message: " Aucun Rendez Vous avec ce nom "} )
    }
})

route.put("/:NOM/edit" , async (req,res)=>{
    const {NOM} = req.params 
    if(req.body){

        const FindRendezvous =await RendezVous.findOneAndUpdate({NOM},req.body,{new:true});
        if(FindRendezvous){
            res.status(200).send({data: FindRendezvous})
        }
        else{
            res.status(401).send({message: " Aucun Rendez Vous avec ce nom "} )
        }
    } 
})



route.delete('/:NOM' , async (req,res) => {
    const {NOM} = req.params 
    const FindRendezvous =await RendezVous.findOne({NOM});
    if(FindRendezvous){
        const FindRendezvous =await RendezVous.findOneAndDelete({NOM});
        res.status(200).send({message  : "REMOVE RENDEZ-VOUS",data: FindRendezvous})
    }
    else{
        res.status(401).send({message: " Aucun Rendez Vous avec ce nom "} )
    }
})





module.exports = route