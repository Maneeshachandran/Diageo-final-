const router =  require('express').Router();
var Category= require('./categorySale.js');
var Product= require('./productSaleDetails.js');
var promocode=require('./promocodeSaleDetails.js');
var sale=require('./yearSale.js');
const customerSegment = require('./../Data/customerSegmentationData.js');


router.post('/getCategory', (req,res)=>{
  console.log("inside getcategory route");
  var categoryList=[];
  Category.categorySale.map((item,i)=>{
    categoryList.push(item.categoryName);
    })
  res.send(categoryList);
  });

  router.post('/getProduct', (req,res)=>{
    console.log("inside getProduct route");
    var productList=[];
    Category.categorySale.map((item,i)=>{
      if(req.query.product == item.categoryName && item.year == 2017)
      {
        productList.push(item.categoryProducts);
      }
    })
  res.send(productList);
    });

    router.post('/getPromocode', (req,res)=>{
      console.log("inside getPromocode route");
      var promocodeList=[];
      var temp=[];
      promocode.promoCode.map((item,i)=>{
        if(req.query.product == item.WhiskyName){
          item.WhiskyPromocode.map((item1)=>{
            promocodeList.push(item1.promo);
          })
        }
      })

    res.send(promocodeList);
      });

      router.post('/getChannels', (req,res)=>{
        console.log("inside getChannels route");

        var channelList=[];
        promocode.promoCode.map((item,i)=>{
          item.WhiskyPromocode.map((item1,i)=>{
            if(item1.promo == req.query.promo)
            {
              channelList=item1.sales;
            }
          })
        })
        res.send(channelList);
        });

       router.post('/getChannelSales', (req,res)=>{
        console.log("inside getChannelSales route");
        var vals=[];
        var dataValue=[];
        Product.productSale.map((item,i)=>{

          item.promoCode.map((item1,i)=>{
            if(item1.partner == req.query.partner){
               valName =item1.partner;
               vals = Object.keys(item1.months).map(function(key) {
            return item1.months[key]
              });
            }
           })
        })
            dataValue.push({value:vals,Name:valName});
            res.send(dataValue);
        });

        router.post('/getTotalSales', (req,res)=>{
        console.log("inside getTotalSales route");
        var allSales=[];
        Product.productSale.map((item,i)=>{
          item.promoCode.map((item1,i)=>{
            if(item1.promo == req.query.promo2){
              allSales.push({name:item1.partner,value:item1.months,weekValue:item1.weeks});
            }
           })
        })
      res.send(allSales);
        });


      router.post('/getPartner', (req,res)=>{
      console.log("inside getPartner route");
      var partnerList=[];
      sale.yearSale.map((item,i)=>{
        item.products.map((item1,i)=>{
          if((req.query.product) == (item1.name)){
            partnerList=item1.sales;
          }
        })
      })
    res.send(partnerList);
      });

      router.post('/getSalesDetails',(req,res)=>{
        console.log("inside getSalesDetails route");
        var saleList=[];
        Product.productSale.map((item,i)=>{
            saleList.push(item);
        })
        res.send(saleList);
        });

        router.post('/getSales',(req,res)=>{
          console.log("inside getSales route");
          var List=[];
          Product.productSale.map((item,i)=>{
            item.promoCode.map((item1)=>{
              if(item1.promo == req.query.check){
                List.push({partner:item1.partner,sale:item1.sale});
              }
            })
          })
        res.send(List);
          });

        router.post('/getPromoSales',(req,res)=>{
          console.log("inside getPromoSales route");
          var totalSales=0;
            Product.productSale.map((item,i)=>{
              item.promoCode.map((item1,i)=>{
                if(req.query.promoSales == item1.promo){
                    var x=parseFloat(item1.sale.replace(/[^\d\.]/g,''));
                    totalSales+=x;
                }
              })
          })
        res.send(totalSales.toString());
          });


          router.post('/comparison',(req,res)=>{
              console.log("inside comparison route");
              var comparisonData=[];
              sale.yearSale.map((item)=>{
                item.products.map((item1)=>{
                  item1.channel.map((item2)=>{
                    comparisonData.push({category:item.categoryName,product:item1.name,channel:item2.channelName,sales:item2.sale,household:item2.household});
                  })
                })
              })
            res.send(comparisonData);
          });

          router.post('/getBehavioural',(req,res)=>{
            res.send(customerSegment);
            });



module.exports=router;
