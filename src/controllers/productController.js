import ProductRepository from "../repository/productRepository.js"; 




       const productRepository =  new ProductRepository();
    
  
        export  const getProducts =  async (req, res) => {
        try {
            const products = await productRepository.getAllProducts();
          
           
            res.status(201).json(products);
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    }

        export  const getProductID = async (req, res) => {

            try {

                console.log(req.session)
                const id = req.params.id;
              const products=await productRepository.getProductById(id) 
              res.status(201).json(products);
            } catch (error) {
                return res.status(500).json({ msg: error.message });
            }
          };

          export  const  saveProduct = async (req, res) => {
            try {
                const product = req.body;
                const productsave = await productRepository.createProduct (product);
                res.send(productsave);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        }
      

        export  const  updateProduct = async (req, res) => {
            try {
                const product = req.body;
                const productsave = await productRepository.updateProduct (product);
                res.send(productsave);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        }
      
        
   
        export  const  deleteProduct = async (req, res) => {
            try {
                const id = req.params.id;
                const productsave = await productRepository.deleteProduct (id);
                res.send(productsave);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        }
    

