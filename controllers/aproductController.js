

const Product = require("../models/Product")

exports.createProduct = async (req, res) => {

    try {

       const newProduct = new Product({...req.body, agentId: req.userId})
       
       await newProduct.save()

       return res.status(200).json(newProduct)

    } catch (error) {
        
        return res.status(400).json(error)
    
    }

}

exports.updateProduct = async (req, res) => {

    try {

        const update = await Product.
        findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });

        return res.status(200).json(update)

    } catch (error) {

        return res.status(401).json(error)

    }
}

exports.getAgentsProduct = async (req, res) => {

    try {

       const recentProducts = await Product.find({agentId: req.userId})
       
       return res.status(200).json(recentProducts)

    } catch (error) {
        
        return res.status(400).json(error)
    
    }

}

exports.getOneProduct = async (req, res) => {

    try {

       const single = await Product.findById(req.params.id)
       
       return res.status(200).json(single)

    } catch (error) {
        
        return res.status(400).json(error)
    
    }

}

exports.deleteOneProduct = async (req, res) => {

    try {

       await Product.findByIdAndDelete(req.params.id)
       
       return res.status(200).json("Product Deleted")

    } catch (error) {
        
        return res.status(400).json(error)
    
    }

}

exports.queryProduct = async (req, res) => {

    try {
        
        // const result = await Product.find({
        //     text: {
        //         query: req.params.query,
        //         path: {
        //           wildcard: '*'
        //         }
        // }})
        let result;

        if( req.query.state && (req.query.state != "all") ){

            result = await Product.aggregate([
                {
                    $search: {
                        // index: "default", // optional, defaults to "default"
                        // autocomplete: {
                        //     query: req.params.query,
                        //     path: { wildcard: "*" },
                        //     tokenOrder: "sequential",
                        //     fuzzy: {
                        //         maxEdits: 1
                        //     }
                        // }
                        compound: {
                            should: [
                                {
                                    autocomplete: {
                                        query:req.query.q || " ",
                                        path: 'description',
                                        tokenOrder: "sequential",
                                        fuzzy: {
                                            maxEdits: 1
                                        }
                                    },
                                },
                                {
                                    autocomplete: {
                                        query:req.query.q || " ",
                                        path: 'title',
                                        tokenOrder: "sequential",
                                        fuzzy: {
                                            maxEdits: 1
                                        }
                                    },
                                },
                            ],
                        },
                    }
                },
                { $match: { state: req.query.state } },
            ])
            
        } else {
            
            result = await Product.aggregate([
                {
                    $search: {
                        index: "default", // optional, defaults to "default"
                        // autocomplete: {
                        //     query: req.params.query,
                        //     path: 'description',
                        //     tokenOrder: "sequential",
                        //     fuzzy: {
                        //         maxEdits: 1
                        //     }
                        // }
                        compound: {
                            should: [
                                {
                                    autocomplete: {
                                        query:req.query.q || " ",
                                        path: 'description',
                                        tokenOrder: "sequential",
                                        fuzzy: {
                                            maxEdits: 1
                                        }
                                    },
                                },
                                {
                                    autocomplete: {
                                        query:req.query.q || " ",
                                        path: 'title',
                                        tokenOrder: "sequential",
                                        fuzzy: {
                                            maxEdits: 1
                                        }
                                    },
                                },
                            ],
                        },
                    }
                },
            ])

        }

        return res.status(200).json(result)

    } catch (error) {

        return res.status(400).json(error)

    }

}

exports.getSuggestions = async (req, res) => {
    try {
        
        const result = await Product.aggregate([
            {
                $search: {
                    index: "default", // optional, defaults to "default"
                    autocomplete: {
                        query: req.params.query,
                        path: 'description',
                        tokenOrder: "sequential",
                        fuzzy: {
                            maxEdits: 1
                        }
                    }
                }
            },
            { $limit: 10 }
        ])

        return res.status(200).json(result)

    } catch (error) {
        return res.status(400).json(error)
    }
}