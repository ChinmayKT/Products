const Product = require('../models/productModel')

const productController = { 
    getProducts : async  (req,res)=> {
        try {

            const keyword = req.query.keyword ? {
                name : {
                    $regex : req.query.keyword ,
                    $options : 'i'
                }
            }:{

            }
            const product = await Product.find({user_id: req.user.id ,...keyword })
         
            res.json(product)
        } catch (error) {
            return res.status(500).json({msg : error.message})
        }
    },

    createProduct : async  (req,res)=> {
        try {
            const { name , price , description} = req.body   
            console.log(req.user.id)
            const newProduct = new Product({ 
                name,
                price,
                description,              
                user_id : req.user.id, 
                username : req.user.name
            })


         
          s =  await newProduct.save()
       
          

            res.json({name: req.user.name, product : newProduct, msg:'product added'})
        } catch (error) {
            return res.status(500).json({msg : error.message})
        }

    }, 

    deleteProduct : async  (req,res)=> {
        try {
            await Product.findByIdAndDelete(req.params.id)
            res.json({msg : "Product Deleted"})      
        } catch (error) {
            return res.status(500).json({msg : error.message})
        }
    },

    updateProduct : async  (req,res)=> {
        try {
            const {name , price , description} = req.body
          
          const s =  await Product.findOneAndUpdate({_id:req.params.id},{
            name,
            price,
            description,
            })
          
            res.json({msg:"Product updated"})
        } catch (error) {
            return res.status(500).json({msg : error.message})
        }
    }
    , 

    getProduct : async  (req,res)=> {
        try {
            const product = await Product.findById(req.params.id)
            res.json({pro:product })
            
        } catch (error) {
            return res.status(500).json({msg : error.message})
        }
    }

}


module.exports = productController