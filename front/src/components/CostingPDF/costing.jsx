import React from "react";

import {
    Page,
    Text,
    View,
    Document,
    StyleSheet
} from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  image: {
    width: "200px",
    height: "auto"
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
  page: {
    backgroundColor: '#FFF',
    paddingTop: 15,
    paddingBottom: 65,
    paddingHorizontal: 6,
  },
  section: {
    margin: 3,
    padding: 3,
    flexGrow: 1
  },
  header_text: {
    fontSize: 11,
    textAlign: "left"
  },
  header_text_bold: {
    fontSize: 11,
    textAlign: "left",
    fontFamily: 'Times-Bold'
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    width: "auto", 
  },
  author: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 5,
    width: "auto", 
  },
  subtitle: {
    fontSize: 6,
    marginBottom: 5,
    width: "auto", 
  },
  subsubtitle: {
    fontSize: 14,
    margin: 6,
    width: "auto", 
  },
  header: {
    fontSize: 12,
    marginBottom: 10,
    textAlign: 'center',
    color: 'grey',
    width: "auto", 
  },
  table: {
    display: "table", 
    width: "auto", 
    borderStyle: "solid", 
    borderWidth: 1, 
    borderRightWidth: 0, 
    borderBottomWidth: 0 ,
    marginBottom: 6
  }, 
  tableRow: {
    margin: "auto", 
    flexDirection: "row" 
  },
  tableRowBold: {
    margin: "auto", 
    flexDirection: "row",
    backgroundColor: "lightgrey"
  },
  tableCollSmall15: {
    width: "15%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCollSmall5: {
    width: "6.53%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCellSmall: {
    margin: "auto", 
    marginTop: 1, 
    fontSize: 6 
  },
  tableCellBoldSmall: {
    margin: "auto", 
    marginTop: 1, 
    fontSize: 6,
    fontFamily: 'Times-Bold'
  },
  tableCol50: {
    width: "50%",
    borderStyle: "solid", 
    borderWidth: 1, 
    borderLeftWidth: 0, 
    borderTopWidth: 0 
  },
  tableCol50NoBorder: {
    width: "50%",
  },
  tableCol40: { 
    width: "40%", 
    borderStyle: "solid", 
    borderWidth: 1, 
    borderLeftWidth: 0, 
    borderTopWidth: 0 
  },
  tableCol25: { 
    width: "25%", 
    borderStyle: "solid", 
    borderWidth: 1, 
    borderLeftWidth: 0, 
    borderTopWidth: 0 
  }, 
  tableCol20: { 
    width: "20%", 
    borderStyle: "solid", 
    borderWidth: 1, 
    borderLeftWidth: 0, 
    borderTopWidth: 0 
  },
  tableCol16: { 
    width: "16.66%", 
    borderStyle: "solid", 
    borderWidth: 1, 
    borderLeftWidth: 0, 
    borderTopWidth: 0 
  },
  tableCol15: { 
    width: "15%", 
    borderStyle: "solid", 
    borderWidth: 1, 
    borderLeftWidth: 0, 
    borderTopWidth: 0 
  },
  tableCol12: { 
    width: "12.50%", 
    borderStyle: "solid", 
    borderWidth: 1, 
    borderLeftWidth: 0, 
    borderTopWidth: 0 
  },
  tableCol10: { 
    width: "10%", 
    borderStyle: "solid", 
    borderWidth: 1, 
    borderLeftWidth: 0, 
    borderTopWidth: 0 
  },
  tableCell: { 
    margin: "auto", 
    marginTop: 5, 
    fontSize: 6 
  },
  tableCellBold: { 
    margin: "auto", 
    marginTop: 1, 
    fontSize: 6,
    fontFamily: 'Times-Bold'
  }
});

function rowTemplate4 (
  bold=false,
  key=0,
  value1=<>&nbsp;</>,
  value2=<>&nbsp;</>,
  value3=<>&nbsp;</>,
  value4=<>&nbsp;</>
) {
  let cellStyle= bold ? styles.tableCellBold : styles.tableCell;
  let rowBGColor = bold ? styles.tableRowBold : styles.tableRow;
  return (<View key={key} style={rowBGColor}>
    <View style={styles.tableCol25}>
      <Text style={cellStyle}>{value1}</Text>
    </View>
    <View style={styles.tableCol25}>
      <Text style={cellStyle}>{value2}</Text>
    </View>
    <View style={styles.tableCol25}>
      <Text style={cellStyle}>{value3}</Text>
    </View>
    <View style={styles.tableCol25}>
      <Text style={cellStyle}>{value4}</Text>
    </View>
  </View>);
}

function rowTemplate5 (
  bold=false,
  key=0,
  value1=<>&nbsp;</>,
  value2=<>&nbsp;</>,
  value3=<>&nbsp;</>,
  value4=<>&nbsp;</>,
  value5=<>&nbsp;</>
) {
  let cellStyle= bold ? styles.tableCellBold : styles.tableCell;
  let rowBGColor = bold ? styles.tableRowBold : styles.tableRow;
  return (<View key={key} style={rowBGColor}>
    <View style={styles.tableCol20}>
      <Text style={cellStyle}>{value1}</Text>
    </View>
    <View style={styles.tableCol20}>
      <Text style={cellStyle}>{value2}</Text>
    </View>
    <View style={styles.tableCol20}>
      <Text style={cellStyle}>{value3}</Text>
    </View>
    <View style={styles.tableCol20}>
      <Text style={cellStyle}>{value4}</Text>
    </View>
    <View style={styles.tableCol20}>
      <Text style={cellStyle}>{value5}</Text>
    </View>
  </View>);
}

function rowTemplate1To4 (
  bold=false,
  label=<>&nbsp;</>,
  key=0,
  value1=<>&nbsp;</>,
  value2=<>&nbsp;</>,
  value3=<>&nbsp;</>,
  value4=<>&nbsp;</>
) {
  let cellStyle= bold ? styles.tableCellBold : styles.tableCell;
  let rowBGColor = bold ? styles.tableRowBold : styles.tableRow;
  return (<View key={key} style={rowBGColor}>
    <View style={styles.tableCol50}>
      <Text style={cellStyle}>{label}</Text>
    </View>
    <View style={styles.tableCol12}>
      <Text style={cellStyle}>{value1}</Text>
    </View>
    <View style={styles.tableCol12}>
      <Text style={cellStyle}>{value2}</Text>
    </View>
    <View style={styles.tableCol12}>
      <Text style={cellStyle}>{value3}</Text>
    </View>
    <View style={styles.tableCol12}>
      <Text style={cellStyle}>{value4}</Text>
    </View>
  </View>);
}

function rowTemplate1To3 (
  bold=false,
  label=<>&nbsp;</>,
  key=0,
  value1=<>&nbsp;</>,
  value2=<>&nbsp;</>,
  value3=<>&nbsp;</>,
) {
  let cellStyle= bold ? styles.tableCellBold : styles.tableCell;
  let rowBGColor = bold ? styles.tableRowBold : styles.tableRow;
  return (<View key={key} style={rowBGColor}>
    <View style={styles.tableCol50}>
      <Text style={cellStyle}>{label}</Text>
    </View>
    <View style={styles.tableCol16}>
      <Text style={cellStyle}>{value1}</Text>
    </View>
    <View style={styles.tableCol16}>
      <Text style={cellStyle}>{value2}</Text>
    </View>
    <View style={styles.tableCol16}>
      <Text style={cellStyle}>{value3}</Text>
    </View>
  </View>);
}

function rowTemplateHalf (
  bold=false,
  label=<>&nbsp;</>,
  key=0,
  value=<>&nbsp;</>,
  firstBold=false
) {
  let cellStyle= bold ? styles.tableCellBold : styles.tableCell;
  let firstCell = firstBold ? styles.tableCellBold : styles.tableCell;
  let rowBGColor = bold ? styles.tableRowBold : styles.tableRow;
  return (<View key={key} style={rowBGColor}>
    <View style={styles.tableCol50}>
      <Text style={firstCell}>{label}</Text>
    </View>
    <View style={styles.tableCol50}>
      <Text style={cellStyle}>{value}</Text>
    </View>
  </View>);
}

function rowTemplateConsumption (
  bold=false,
  key=0,
  label=<>&nbsp;</>,
  weightBWashOriginal=0,
  weightBWashCalculated=0,
  dm_width=0,
  markerWidth=0,
  dm_pt=0,
  yieldydslbs=0,
  markerEfficiency=0,
  markerLong=0,
  pieceByMarker=0,
  lbsunit=0,
  lbsunitwaste=0,
  sqinchunit=0,
  ydsunit=0
){
  let cellStyle= bold ? styles.tableCellBoldSmall : styles.tableCellSmall;
  let rowBGColor = bold ? styles.tableRowBold : styles.tableRow;
  let row = (<View style={rowBGColor} key={key}>
    <View style={styles.tableCollSmall15}>
      <Text style={cellStyle}>{label}</Text>
    </View>
    <View style={styles.tableCollSmall5}>
      <Text style={cellStyle}>{weightBWashOriginal}</Text>
    </View>
    <View style={styles.tableCollSmall5}>
      <Text style={cellStyle}>{weightBWashCalculated}</Text>
    </View>
    <View style={styles.tableCollSmall5}>
      <Text style={cellStyle}>{dm_width}</Text>
    </View>
    <View style={styles.tableCollSmall5}>
      <Text style={cellStyle}>{markerWidth}</Text>
    </View>
    <View style={styles.tableCollSmall5}>
      <Text style={cellStyle}>{dm_pt}</Text>
    </View>
    <View style={styles.tableCollSmall5}>
      <Text style={cellStyle}>{yieldydslbs}</Text>
    </View>
    <View style={styles.tableCollSmall5}>
      <Text style={cellStyle}>{markerEfficiency}</Text>
    </View>
    <View style={styles.tableCollSmall5}>
      <Text style={cellStyle}>{markerLong}</Text>
    </View>
    <View style={styles.tableCollSmall5}>
      <Text style={cellStyle}>{pieceByMarker}</Text>
    </View>
    <View style={styles.tableCollSmall5}>
      <Text style={cellStyle}>{lbsunit}</Text>
    </View>
    <View style={styles.tableCollSmall5}>
      <Text style={cellStyle}>{lbsunitwaste}</Text>
    </View>
    <View style={styles.tableCollSmall5}>
      <Text style={cellStyle}>{sqinchunit}</Text>
    </View>
    <View style={styles.tableCollSmall5}>
      <Text style={cellStyle}>{ydsunit}</Text>
    </View>
  </View>);
  return row;
}

//let emptyRow= rowTemplate1To4(false);

export function PdfCosting(props) {
  
  // fabrics + consumption
  function RenderFabrics(fabricsData,index=0){
    let header = rowTemplate1To4(true,"Fabric LBS",-1,"White","Medium","Dark","Special");
    let headerY = rowTemplate1To4(true,"Fabric YDS",-1,"White","Medium","Dark","Special");
    let headerConsumption = rowTemplateConsumption(
      true,-1,"Fabric type",
      "Weight b.wash Origianl",
      "Weight b.wash Calculated",
      "Width",
      "Marker Width",
      "Plies Tubular",
      "Yield",
      "Utilization %",
      "Marker Length",
      "Units Marker",
      "Lbs * Unit",
      "Lbs * Unit + waste",
      "Inch^2 Unit",
      "YD / Unit"
    );
    function calcFabric(price, lbsunit){
      let cost = ((12*lbsunit) * price) /12;
      return cost ? cost : 0;
    }
    let table = (<View key={index}>
      <Text style={styles.subtitle}>Fabric Consumption</Text>
      <View style={styles.table} key={0}>
        {headerConsumption}
        {fabricsData.map( (element,idx) => {
          let label = element.show_name ? element.show_name : '';
          return rowTemplateConsumption(
            false,idx,label,
            parseFloat(element.weightBWashOriginal).toFixed(2),
            parseFloat(element.weightBWashCalculated).toFixed(2),
            parseFloat(element.dm_width).toFixed(2),
            parseFloat(element.markerWidth).toFixed(2),
            element.dm_pt?"1":"0",
            parseFloat(element.yieldydslbs).toFixed(2),
            parseFloat(element.markerEfficiency).toFixed(2),
            parseFloat(element.markerLong).toFixed(2),
            parseFloat(element.pieceByMarker).toFixed(2),
            parseFloat(isNaN(element.lbsunit)?'0':element.lbsunit).toFixed(2),
            parseFloat(isNaN(element.lbsunitwaste)?'0':element.lbsunitwaste).toFixed(2),
            parseFloat(isNaN(element.sqinchunit)?'0':element.sqinchunit).toFixed(2),
            parseFloat(isNaN(element.ydsunit)?'0':element.ydsunit).toFixed(2),
          );
        })}
      </View>
      <Text style={styles.subtitle}>Fabrics</Text>
      <View style={styles.table} key={1}>
        {header}
        {fabricsData.map( (element,idx) => {
          let label = element.show_name ? element.show_name : '';
          return rowTemplate1To4(
            false,label,idx,
            '$ '+element.priceWhite,
            '$ '+element.priceMedium,
            '$ '+element.priceDark,
            '$ '+element.priceSpecial
          );
        })}
      </View>
      <View style={styles.table} key={1}>
        {headerY}
        {fabricsData.map( (element,idx) => {
          let label = element.show_name ? element.show_name : '';
          return rowTemplate1To4(
            false,label,idx,
            '$ '+(element.priceWhite/element.yieldydslbs).toFixed(2),
            '$ '+(element.priceMedium/element.yieldydslbs).toFixed(2),
            '$ '+(element.priceDark/element.yieldydslbs).toFixed(2),
            '$ '+(element.priceSpecial/element.yieldydslbs).toFixed(2)
          );
        })}
      </View>
      <View style={styles.table} key={2}>
        {fabricsData.map( (element,idx) => {     
          const costWhite = calcFabric(parseFloat(element.priceWhite),parseFloat(element.lbsunit));
          const costMedium = calcFabric(parseFloat(element.priceMedium),parseFloat(element.lbsunit));
          const costDark = calcFabric(parseFloat(element.priceDark),parseFloat(element.lbsunit));
          const costSpecial = calcFabric(parseFloat(element.priceSpecial),parseFloat(element.lbsunit));
          let label = element.show_name ? element.show_name : '';
          return rowTemplate1To4(
            false,label,idx,
            '$ '+costWhite.toFixed(2),
            '$ '+costMedium.toFixed(2),
            '$ '+costDark.toFixed(2),
            '$ '+costSpecial.toFixed(2)
          );
        })}
      </View>
    </View>);
    return table;
  }

  // sum fabrics table
  function RenderSumFabrics(sumFabrics,wasteFabrics,index=0){
    let table = <View style={styles.table} key={index}>
      {rowTemplate1To4(
        true,"PIECE GOODS TOTAL (+"+wasteFabrics+"%)",0,
        '$ '+sumFabrics.white.toFixed(2),
        '$ '+sumFabrics.medium.toFixed(2),
        '$ '+sumFabrics.dark.toFixed(2),
        '$ '+sumFabrics.special.toFixed(2)
      )}
    </View>;
    return table;
  }

  // materials table
  function RenderMaterials(materialsData){
    //let header = rowTemplateHalf(true,"Material",-1,"Unit Price",true);
    let header = rowTemplate1To3(true,"Materials",-1,"Unit Price","Transport","Price");
    let table = (<View style={styles.table}>
      {header}
      {materialsData.map( (element,idx) => {
        let label = element.material ? element.material : '';
        let value = element.unitPrice+element.transport;
        return rowTemplate1To3(
          false,label,idx,
          '$ '+ element.unitPrice.toFixed(4),
          '$ '+ element.transport.toFixed(4),
          '$ '+value.toFixed(4),
          );
      })}
    </View>);
    return table;
  }

  // sum materials table
  function RenderSumMaterials(pricesMaterials,wasteMaterials,index=0){
    return <View style={styles.table} key={index}>
      {rowTemplateHalf(true,"TRIMMING TOTAL (+"+wasteMaterials+"%)",index,'$ '+pricesMaterials.toFixed(2),true)}
    </View>
  }

  // Manufacturing
  function RenderManufacturingCosts(pir,data){
    let table = (<>
      <View style={styles.table} key={0}>
        {rowTemplateHalf(false,"SAM",1,data.totalTime.toFixed(2),true)}
        {rowTemplateHalf(false,"Cost per Minute",2,'$ '+data.cxm.toFixed(2),true)}
        {rowTemplateHalf(false,"Sewing",3,'$ '+data.sewing.toFixed(2),true)}
        {rowTemplateHalf(false,"Cutting",4,'$ '+data.cutting.toFixed(2),true)}
        {rowTemplateHalf(false,"Manufacturing Total",5,'$ '+data.manufacturing.toFixed(2),true)}
        {rowTemplateHalf(false,"Ir Reserve",0,pir+"%",true)}
        {rowTemplate5(true,6,
          ' ',
          "Manufacturing White",
          "Manufacturing Medium",
          "Manufacturing Dark",
          "Manufacturing Special"
        )}
        {rowTemplate5(false,7,
          'Normal',
          '$ '+data.manufacturingPrices.white.toFixed(2),
          '$ '+data.manufacturingPrices.medium.toFixed(2),
          '$ '+data.manufacturingPrices.dark.toFixed(2),
          '$ '+data.manufacturingPrices.special.toFixed(2)
        )}
        {rowTemplate5(false,7,
          'IR Reserve',
          '$ '+(data.manufacturingPrices.white * (pir/100)).toFixed(2),
          '$ '+(data.manufacturingPrices.medium* (pir/100)).toFixed(2),
          '$ '+(data.manufacturingPrices.dark* (pir/100)).toFixed(2),
          '$ '+(data.manufacturingPrices.special* (pir/100)).toFixed(2)
        )}
      </View>
    </>);
    return table;
  }

  // FOB guatemala
  function RenderFOBGuatemala(data){
    let table = (<>
      <View style={styles.table} key={0}>
        {rowTemplateHalf(false,"Insurance",1,'$ '+data.broker.toFixed(2),true)}
        {/*rowTemplateHalf(false,"Freight Price",2,'$ '+data.freightPrice.toFixed(2),true)*/}
        {/*rowTemplateHalf(false,"Freight Units",3,'$ '+data.freightQuantity.toFixed(2),true)*/}
        {rowTemplateHalf(false,"Freight per Unit",4,'$ '+data.freightTotal.toFixed(2),true)}
        {rowTemplate4(true,5,
          "White",
          "Medium",
          "Dark",
          "Special"
        )}
        {rowTemplate4(false,6,
          '$ '+data.logisticsPrices.white.toFixed(2),
          '$ '+data.logisticsPrices.medium.toFixed(2),
          '$ '+data.logisticsPrices.dark.toFixed(2),
          '$ '+data.logisticsPrices.special.toFixed(2)
        )}
      </View>
    </>);
    return table;
  }

  // FOB Total
  function RenderFOBTotal(data){
    let table = (<>
      <View style={styles.table} key={0}>
        {rowTemplateHalf(false,"Factoring",0,+data.factoring.toFixed(2) + '%',true)}
        {rowTemplate4(true,1,
          "Profit White %",
          "Profit Medium %",
          "Profit Dark %",
          "Profit Special %"
        )}
        {rowTemplate4(false,2,
          (data.profit.white*100).toFixed(2)+'%',
          (data.profit.medium*100).toFixed(2)+'%',
          (data.profit.dark*100).toFixed(2)+'%',
          (data.profit.special*100).toFixed(2)+'%'
        )}
        {rowTemplate4(false,3,
          '$ '+(data.profitValues.white).toFixed(2),
          '$ '+(data.profitValues.medium).toFixed(2),
          '$ '+(data.profitValues.dark).toFixed(2),
          '$ '+(data.profitValues.special).toFixed(2),
        )}
        {rowTemplateHalf(false,"Sale Commision",4,(data.sellCommision*100).toFixed(2)+'%',true)}
      </View>
    </>);
    return table;
  }
  
  const embLine = [
    {value: 'O', label: 'OTHER'},
    {value: 'B', label: 'BONDING'},
    {value: 'E', label: 'EMBROIDERY'},
    {value: 'A', label: 'APPLIQUE'},
    {value: 'EM', label: 'EMBOSSED'},
    {value: 'RS', label: 'ROLL_SUBLIMATION'},
    {value: 'S', label: 'SCREENPRINT'},
    {value: 'SU', label: 'SUBLIMATION'},
    {value: 'G', label: 'GARMENT_WASH'}
  ]

  function RenderEmbellishments(data,calcs) {
    return (<View style={styles.table} >
      {rowTemplateHalf(true,"Decoration",-1,"Unit Price",true)}
      {data.embellishments.map((embellishment,idx) => {
        let text = embLine.find(line => line.value === embellishment.name) 
        //console.log(text)
        let value = embellishment.price + (embellishment.price * (embellishment.margin/100))
        return rowTemplateHalf(false,text.label,idx,'$ '+value.toFixed(2),false);
      })}
      {rowTemplateHalf(true,"TOTAL EMBELLISHMENT",99,'$ '+calcs.totalEmbellishments.toFixed(2),true)}
    </View>);
  }

  function RenderSellingPrice(sellingPrices) {
    return (<View style={styles.table}>
      {rowTemplate4(true,1,
        "Price White",
        "Price Medium",
        "Price Dark",
        "Price Special"
      )}
      {rowTemplate4(false,2,
        '$ '+sellingPrices.white.toFixed(2),
        '$ '+sellingPrices.medium.toFixed(2),
        '$ '+sellingPrices.dark.toFixed(2),
        '$ '+sellingPrices.special.toFixed(2)
      )}
    </View>);
  }

  /*function RenderImage(index,sketch){
    let image = <></>;
    if(sketch !== ''){
      image=<Image style={styles.image} src={sketch} />
    }
    return (<View key={index}>
      {image}
    </View>);
  }*/

  return(
    <Document>
      <Page style={styles.page}>
        <Text style={styles.title}>
          {props.headerData.style}
        </Text>
        <View style={styles.section}>
          <View>
            {RenderFabrics(props.data.dms)}
          </View>
          <View>
            {RenderSumFabrics(props.Calc.pricesFabrics,props.data.pfabrics)}
          </View>
          <View>
            <Text style={styles.subtitle}>Materials</Text>
            {RenderMaterials(props.data.materials)}
          </View>
          <View>
            {RenderSumMaterials(props.Calc.pricesMaterials,props.data.pmaterials)}
          </View>
          <View>
            <Text style={styles.subtitle}>Manufacturing</Text>
            {RenderManufacturingCosts(props.data.pir,props.Calc)}
          </View>
          <View>
            <Text style={styles.subtitle}>Cost FOB Guatemala</Text>
            {RenderFOBGuatemala(props.Calc)}
          </View>
          <View>
            <Text style={styles.subtitle}>Cost FOB Total</Text>
            {RenderFOBTotal(props.Calc)}
          </View>
          <View>
            <Text style={styles.subtitle}>Embellishments</Text>
            {RenderEmbellishments(props.data,props.Calc)}
          </View>
          <View>
            <Text style={styles.subtitle}>Final Selling Prices</Text>
            {RenderSellingPrice(props.Calc.sellingPrices)}
          </View>
        </View>
        <Text style={styles.pageNumber} 
          render={({pageNumber,totalPages})=>(
            `${pageNumber} / ${totalPages}`
          )}
          fixed 
        />
      </Page>
    </Document>
  )
}