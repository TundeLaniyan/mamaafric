const print = console.log;



class  APIFeatures  {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString
    }

    filter () {

            const queryObj = { ...this.queryString }

            const excludeField = ['page', 'sort', 'limit', 'fields', 'keyword']

            excludeField.forEach( excludedFields => delete queryObj[excludedFields] )

            // Advanced filtering  if gte lte etc

            let queryStr = JSON.stringify(queryObj)

            queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)

            // print(JSON.parse(queryStr))
            this.query = this.query.find(JSON.parse(queryStr))

            // let query =  Tour.find(JSON.parse(queryStr))
            
            return this;
    }

    sort () {

        if(this.queryString.sort) {
        const sortBy = this.queryString.sort.split(',').join(' ')

        // print(sortBy)

        this.query = this.query.sort(sortBy)

        } else {
            this.query = this.query.sort('-createdAt')
        }

        return this;
    }

    limitFields () {
        
        if(this.queryString.fields) {
            const fields = this.queryString.fields.split(',').join(' ')

            // print(fields)

            this.query = this.query.select(fields)

        } else {
            this.query = this.query.select('-__v')
        }

        return this;
    }

    pagination () {
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 100;
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit);
        
        return this;
    }


    // Keyword (keyword = {}) {

    //     if (this.queryString.keyword) {

    //         this.query = {
    //             keyword:{
    //                 slug: {
    //                     $regex: this.queryString.keyword,
    //                     $options: 'i'
    //                 }
    //             } 
    //         } 
    // } 


    //     return this
    // }
    
}




module.exports = APIFeatures