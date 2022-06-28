module.exports  = fn=>{
    return ((req, res)=>{
        fn(req, res).catch(err=>{
            console.log(err);
        })
    })
}