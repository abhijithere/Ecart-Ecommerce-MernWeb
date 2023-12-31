class ApiFeatures{
    constructor(query,querystr){
        this.query=query;
        this.querystr=querystr;
    }

    search(){
        const keyword= this.querystr.keyword?{
            name:{
                $regex:this.querystr.keyword,
                $options:"i",
            }
        }:{};
        this.query = this.query.find({...keyword});
        return this;
    }

    filter(){
        const querycopy = {...this.querystr};

        //removinfg some fields from filter
        const removefields = ["keyword","page","limit"];
        removefields.forEach((key)=> delete querycopy[key]);


        //filter for price and rating
        let querystr =JSON.stringify(querycopy);
        querystr = querystr.replace(/\b(gt|gte|lt|lte)\b/g,(key)=>`$${key}`);


        this.query = this.query.find(JSON.parse(querystr));
        return this;
    }

    pagination(resultperpage){
        const currentPage = Number(this.querystr.page)||1;
        const skip = resultperpage*(currentPage-1);

        this.query= this.query.limit(resultperpage).skip(skip);

        return this;
    }



}

export default ApiFeatures;