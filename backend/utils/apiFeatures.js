class APIFeatures{
    constructor(query,queryStr){   // here queryStr is refers to parameter passed through url
        this.query=query;
        this.queryStr=queryStr;
    }
    search(){
       let keyword =this.queryStr.keyword ?{   // check url contain name 'keyword'
        name:{
            $regex:this.queryStr.keyword,
            $options : 'i'
        }
       } : {};  // if not contain, same as empty(no parameter)
       this.query.find({...keyword})
       return this;
    }
    filter(){
       const queryStrCopy={...this.queryStr}; // copy the parameter
       // removing field from query
       const removeFields =['keyword','limit','page'];   // remove all except the 'price'
       removeFields.forEach(field=> delete queryStrCopy[field]);
       let querydupStr= JSON.stringify(queryStrCopy);  // convert json string obj format
       querydupStr= querydupStr.replace(/\b(gt|lt|gte|lte)/g, match =>`$${match}`)  // concatenate $ symbol in every in every word like lt,gte because of mongoose data call
       this.query.find(JSON.parse(querydupStr));  // again change to normal
       return this;
    }
    paginate(resPerPage){
       const currentPage= Number(this.queryStr.page) || 1;
       const skip = resPerPage * (currentPage - 1);
       this.query.limit(resPerPage).skip(skip);
       return this;
    }
}
module.exports = APIFeatures;