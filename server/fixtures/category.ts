import { Category } from './../models/Categories';

// Load default categories values
const loadCategories = () =>{
    Category.count({},(err,count)=>{
 
        if(count ==0){
            const categories: any= [
                
                {
                    name: 'Science'
                },
                {
    
                    name: 'History'
                },
                {
    
                    name: 'Programming'
                },
                {
    
                    name: 'Engineering'
                }
            ];
            
            categories.forEach((category:any )=>{
                let new_category = new Category(category);
                new_category.save();
            });
        }
    });

}
export { loadCategories }

