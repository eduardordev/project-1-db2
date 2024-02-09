/**
 * gets detail and calculates all cost of a costsheet
 * @param {Object} detail detail to calculate
 * @param {Object} costsheet the calculated data
 */
export default function CostingCalculations(detail){

  function fxNum(value){
    if(value === null || value === undefined || value==="" || isNaN(value)){
      return 0;
    }
    return parseFloat(value);
  }

  function sumFabricsBuild(fabrics,pfabrics){
    let totalWhite = 0;
    let totalMedium = 0;
    let totalDark = 0;
    let totalSpecial = 0;
    fabrics.map(fabric=>{
      let ydsunit = (fabric.Bwidth / 36) * (1 / (fabric.dm_width * 1)) * fabric.Blong;
      let lbsunit = (ydsunit / fabric.yieldydslbs);
      if(!fabric.lbsunit) {
        fabric.lbsunit=lbsunit
      }
      if(fabric.wasted_flag){
        let costWhite = ( (fxNum(fabric.lbsunitwaste)*12) * fxNum(fabric.priceWhite) ) / 12;
        let costMedium = ( (fxNum(fabric.lbsunitwaste)*12) * fxNum(fabric.priceMedium) ) / 12;
        let costDark = ( (fxNum(fabric.lbsunitwaste)*12) * fxNum(fabric.priceDark) ) / 12;
        let costSpecial = ( (fxNum(fabric.lbsunitwaste)*12) * fxNum(fabric.priceSpecial) ) / 12;
        totalWhite+=costWhite;
        totalMedium+=costMedium;
        totalDark+=costDark;
        totalSpecial+=costSpecial;
        return fabric
      }else {
        let costWhite = ( (fxNum(fabric.lbsunit)*12) * fxNum(fabric.priceWhite) ) / 12;
        let costMedium = ( (fxNum(fabric.lbsunit)*12) * fxNum(fabric.priceMedium) ) / 12;
        let costDark = ( (fxNum(fabric.lbsunit)*12) * fxNum(fabric.priceDark) ) / 12;
        let costSpecial = ( (fxNum(fabric.lbsunit)*12) * fxNum(fabric.priceSpecial) ) / 12;
        totalWhite+=costWhite;
        totalMedium+=costMedium;
        totalDark+=costDark;
        totalSpecial+=costSpecial;
        return fabric

      }
    });

    totalWhite = ( ( (totalWhite * pfabrics) / (1 - pfabrics) ) + totalWhite );
    totalMedium = ( ( (totalMedium * pfabrics) / (1 - pfabrics) ) + totalMedium );
    totalDark = ( ( (totalDark * pfabrics) / (1 - pfabrics) ) + totalDark );
    totalSpecial = ( ( (totalSpecial * pfabrics) / (1 - pfabrics) ) + totalSpecial );

    return {
      white: totalWhite,
      medium: totalMedium,
      dark: totalDark,
      special: totalSpecial,
    }
  }

  function sumMaterialsBuild(materials){
    let subMaterials = 0;
    materials.map(material => subMaterials += (fxNum(material.unitPrice)+fxNum(material.transport)) )
    return subMaterials
  }

  function sumEmbellishmentsBuild(embellishments){
    let subEmbellishments = 0;
    embellishments.map(embellishment => {
      let price=fxNum(embellishment.price);
      let margin=fxNum(embellishment.margin);
      let marginPrice=price * ( margin/100 );
      subEmbellishments+=price + marginPrice;
      return embellishment
    })
    return subEmbellishments;
  }

  const cxm = fxNum(detail.cxm);
  const totalTime = fxNum(detail.totalTime);
  const production_time = fxNum(detail.production_time);
  const operation_flag = detail.operation_flag;
  const extraTime = fxNum(detail.extra_time);
  const SAM = (operation_flag ? totalTime : production_time);
  const cutting = fxNum(detail.cutting);
  const manufacturing = (cxm * (SAM+extraTime)) + cutting;
  
  let pfabrics = fxNum(detail.pfabrics)/100;
  let pmaterials = fxNum(detail.pmaterials)/100;
  let pir = fxNum(detail.pir)/100;

  const sumFabrics = sumFabricsBuild(detail.dms,pfabrics);
  const subMaterials = sumMaterialsBuild(detail.materials);
  const sumMaterials = subMaterials + ( subMaterials * ( pmaterials / (1-pmaterials) ) );
  const sumEmbellishments = sumEmbellishmentsBuild(detail.embellishments);

  let manufacturingWhite = sumFabrics.white + sumMaterials + manufacturing;
  let manufacturingMedium = sumFabrics.medium + sumMaterials + manufacturing;
  let manufacturingDark = sumFabrics.dark + sumMaterials + manufacturing;
  let manufacturingSpecial = sumFabrics.special + sumMaterials + manufacturing;

  manufacturingWhite    += (manufacturingWhite * pir) / (1-pir);
  manufacturingMedium   += (manufacturingMedium * pir) / (1-pir);
  manufacturingDark     += (manufacturingDark * pir) / (1-pir);
  manufacturingSpecial  += (manufacturingSpecial * pir) / (1-pir);

  let pirWhite = manufacturingWhite - sumFabrics.white - sumMaterials - manufacturing;
  let pirMedium = manufacturingMedium - sumFabrics.medium - sumMaterials - manufacturing;
  let pirDark = manufacturingDark - sumFabrics.dark - sumMaterials - manufacturing;
  let pirSpecial = manufacturingSpecial - sumFabrics.special - sumMaterials - manufacturing;

  //const duty = fxNum(detail.duty);
  const broker = fxNum(detail.broker);
  const factoring = fxNum(detail.factoring) / 100;

  let freightPrice = fxNum(detail.freightPrice);
  let freightQuantity = fxNum(detail.freightQuantity);
  let freightTotal = freightQuantity > 0 ? freightPrice/freightQuantity : 0;

  // duty + broker + freightTotal
  let totalWhite = manufacturingWhite +  broker + freightTotal;
  let totalMedium = manufacturingMedium +  broker + freightTotal;
  let totalDark = manufacturingDark +  broker + freightTotal;
  let totalSpecial = manufacturingSpecial +  broker + freightTotal;

  let dbfWhite = totalWhite;
  let dbfMedium = totalMedium;
  let dbfDark = totalDark;
  let dbfSpecial = totalSpecial;

  const profitPercentWhite = fxNum(detail.profitWhite)/100;
  const profitPercentMedium = fxNum(detail.profitMedium)/100;
  const profitPercentDark = fxNum(detail.profitDark)/100;
  const profitPercentSpecial = fxNum(detail.profitSpecial)/100;

  //pre selling Price
  const sWhite = manufacturingWhite / (1 - profitPercentWhite);
  const sMedium = manufacturingMedium / (1 - profitPercentMedium);
  const sDark = manufacturingDark / (1 - profitPercentDark);
  const sSpecial = manufacturingSpecial / (1 - profitPercentSpecial);

  const factoringWhite = factoring * sWhite;
  const factoringMedium = factoring * sMedium;
  const factoringDark = factoring * sDark;
  const factoringSpecial = factoring * sSpecial;

  // selling price
  let sellingWhite = ((totalWhite + factoringWhite) / (1 - profitPercentWhite));
  let sellingMedium = ((totalMedium + factoringMedium) / (1 - profitPercentMedium));
  let sellingDark = ((totalDark + factoringDark) / (1 - profitPercentDark));
  let sellingSpecial = ((totalSpecial + factoringSpecial) / (1 - profitPercentSpecial));

  const profitValues = {
    white: sellingWhite * profitPercentWhite,
    medium: sellingMedium * profitPercentMedium,
    dark: sellingDark * profitPercentDark,
    special: sellingSpecial * profitPercentSpecial
  }

  const sell = fxNum(detail.sell)/100;

  const sellWhite = sellingWhite * sell / (1 - sell);
  const sellMedium = sellingMedium * sell / (1 - sell);
  const sellDark = sellingDark * sell / (1 - sell);
  const sellSpecial = sellingSpecial * sell / (1 - sell);

  sellingWhite += sellWhite;
  sellingMedium += sellMedium;
  sellingDark += sellDark;
  sellingSpecial += sellSpecial;

  const totalValues = {
    white: sellingWhite,
    medium: sellingMedium,
    dark: sellingDark,
    special: sellingSpecial
  }

  //total embellishment
  const decorationMargin = fxNum(detail.decorationMargin) / 100;
  const totalEmbellishments = sumEmbellishments;// + (sumEmbellishments * decorationMargin);
  
  // Embellishment %
  sellingWhite +=  totalEmbellishments;
  sellingMedium += totalEmbellishments;
  sellingDark += totalEmbellishments;
  sellingSpecial += totalEmbellishments;
  return {
    "wasteFabrics": pfabrics,
    "pricesFabrics": sumFabrics,
    "wasteMaterials": pmaterials,
    "pricesMaterials": sumMaterials,
    "IrReserve": pir,
    "IrPrices": {
      "white": pirWhite,
      "medium": pirMedium,
      "dark": pirDark,
      "special": pirSpecial,
    },
    "cxm": cxm,
    "totalTime": SAM,
    "extraTime": extraTime,
    "sewing": cxm * (SAM + extraTime),
    "cutting": cutting,
    "manufacturing": manufacturing,
    "manufacturingPrices":{      
      "white": manufacturingWhite,
      "medium": manufacturingMedium,
      "dark": manufacturingDark,
      "special": manufacturingSpecial,
    },
    "broker": broker,
    "freightPrice": freightPrice,
    "freightQuantity": freightQuantity,
    "freightTotal": freightTotal,
    "logisticsPrices": {
      "white": dbfWhite,
      "medium": dbfMedium,
      "dark": dbfDark,
      "special": dbfSpecial,
    },
    "profit": {
      "white": profitPercentWhite,
      "medium": profitPercentMedium,
      "dark": profitPercentDark,
      "special": profitPercentSpecial,
    },
    "profitValues": profitValues,
    "preSellPrices": {
      "white": sWhite,
      "medium": sMedium,
      "dark": sDark,
      "special": sSpecial,
    },
    "factoring": factoring,
    "factoringPrices": {
      "white": factoringWhite,
      "medium": factoringMedium,
      "dark": factoringDark,
      "special": factoringSpecial,
    },
    "sellCommision": sell,
    "sellComisionPrices": {
      "white": sellWhite,
      "medium": sellMedium,
      "dark": sellDark,
      "special": sellSpecial,
    },
    "totalValues": totalValues,
    "decorationMargin": decorationMargin,
    "sumEmbellishments": sumEmbellishments,
    "totalEmbellishments": totalEmbellishments,
    "sellingPrices": {
      "white": sellingWhite,
      "medium": sellingMedium,
      "dark": sellingDark,
      "special": sellingSpecial,
    }
  };
}