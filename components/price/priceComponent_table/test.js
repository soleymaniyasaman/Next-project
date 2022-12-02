import { React, useState, useEffect } from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import styles from './priceComponent_table.module.scss';


const test = ({tableData,brand}) => {
    const { SearchBar } = Search;
    const [isMobile, setIsMobile] = useState(false);

    // const jobs = [{id: 0,name: tableData[0].ram,owner: 0,type: 0},{id:1,name:tableData[1].ram,owner: 1,type: 1}]
    const jobs = [
      { icon: tableData[0].logo, owner: 0, ram: tableData[0].ram, color: tableData[0].backColor, type: 0, garantee: tableData[0].garantee, comment: tableData[0].comment, chart: tableData[0].chartData },
      { icon: tableData[1].logo, owner: 1, ram: tableData[1].ram, color: tableData[1].backColor, type: 1, garantee: tableData[1].garantee, comment: tableData[1].comment, chart: tableData[1].chartData },
      { icon: tableData[2].logo, owner: 2, ram: tableData[2].ram, color: tableData[2].backColor, type: 2, garantee: tableData[2].garantee, comment: tableData[2].comment, chart: tableData[2].chartData },

  ]
    const PName = []
    const EName = []
    const PPrice = []
    const CPrice = []
    tableData.forEach(table => {
        PName.push(`${table.persianName}`)
        EName.push(`${table.englishName}`)
        PPrice.push(`${table.price.price}`)
        CPrice.push(`${table.price.changePrice}`)

    });
    const idFormatter = (cell) => {
      return (
        <p className={`${styles.PriceComponent_tableRam} `}>{cell}</p>
    )    }
    const columns = [{
      dataField: 'ram',
      text: 'Job NAME',
      formatter:idFormatter,
      searchable: false,
      
    }, {
      dataField: 'owner',
      text: 'Job Owner',
      formatter: (cell, row) =>{return(
            <div>
                <p>{PName[cell]}</p>
                <p>{EName[cell]}</p>
            </div>
            )},      
      filterValue: (cell, row) => [PName[cell],EName[cell]] ,
      //filterValue: (cell, row) => owners[cell[1]]// we will search the value after filterValue called
    }, {
      dataField: 'type',
      text: 'Job Type',
      formatter: (cell, row) =>{return(
        <div>
            <p>{PPrice[cell]}</p>
            <p>{CPrice[cell]}</p>
        </div>
        )}, 
        filterValue: (cell, row) => [PPrice[cell],CPrice[cell]] ,
      }];
    useEffect(() => {
      window.addEventListener("resize", () => {
          if (window.innerWidth < 576) {
              console.log("heeeyyyy");
              setIsMobile(true);
          } else {
              console.log("hooooy");
              setIsMobile(false);
          }
      }, false);
  }, [isMobile]);
    const expandRow = {
      // className: `${styles.expanding_foo}`,
      renderer: (row,rowIndex) => {
        // <div style={ { width: '100%', height: '20px' } }>Content</div>
        var table =[]
        table.push({
          ram:tableData[rowIndex].ram,
          garantee:tableData[rowIndex].garantee,
          backColor:tableData[rowIndex].backColor
        })
        return(
            <>
            {console.log(table)}
              {table.map(table => (
                <>
                <p>{table.ram}</p>
                <p>{table.garantee}</p>
                <div className={`${styles.PriceComponent_tableGarantee} `}>{table.backColor}</div>

                </>
              ))}
              </>

        )
      },
      showExpandColumn: isMobile? true : false,
      expandByColumnOnly: true
    };
    return (
        <div>

<ToolkitProvider
  keyField="id"
  data={ jobs }
  columns={ columns }
  search
>
  {
    props => (
      <div>
        <h3>Try to Search Bob, Cat or Allen instead of 0, 1 or 2</h3>
        <SearchBar { ...props.searchProps } />
        <hr />
        <BootstrapTable
          { ...props.baseProps }
          bordered={false}
          hover
          id={styles.table}
          bodyClasses={`${styles.priceComponent_tableBody} priceComponent_tableBody_color_${brand}`}
          headerWrapperClasses={`${styles.priceComponent_tableHeader} priceComponent_tableHeader_color_${brand}`}
          expandRow={ expandRow }

        />
      </div>
    )
  }
</ToolkitProvider>
        </div>
    );
}

export default test;


// shape of job: { id: 0, name: 'Job name 0', owner: 1, type: 3 }

// formatter: (cell, row) =>(
//     <div>
//         <p>{owners[cell[0]]}</p>
//         <p>{owners[cell[1]]}</p>
//     </div>
//      ),

// const jobs = [{id: 0,name: 'Job name 0',owner: [1,2],type: 3}]
