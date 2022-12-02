import { React, useState, useEffect } from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
import styles from './priceComponent_table.module.scss';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import PriceComponent_tableChart from './priceComponent_tableChart';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';



function PriceComponent_table({ brands, changeTableData, tableData, brand }) {
    const { SearchBar } = Search;
    const [isMobile, setIsMobile] = useState(false);
    const [RowIndex, setRowIndex] = useState()
    const owners = [tableData.persianName, tableData.englishName, tableData.ram];
    const numDiscriminant = (input) => {
        return input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "/");
    }
    const priceMarginColorize = (input) => {
        if (input === 0) {
            return (
                <p className={`${styles.pPriceMargin} cardSectionPriceMargin_gray`}>
                    +{numDiscriminant(input)}
                </p>
            )
        } else if (input >= 0) {
            return (
                <p className={`${styles.pPriceMargin} cardSectionPriceMargin_green`}>
                    +{numDiscriminant(input)}
                </p>
            )
        } else {
            return (
                <p className={`${styles.pPriceMargin} cardSectionPriceMargin_red`}>
                    {numDiscriminant(input)}
                </p>
            )
        }
    }
    const imageFormatter = (cell) => {
        return (
            <img className={styles.PriceComponent_tableImage} src={cell} />
        )
    }

    const colorFormatter = (cell) => {
        return (
            <div className={`${styles.PriceComponent_tableColorContainer}`}>
                {cell ?

                    cell.map((item, index) => (
                        <div key={index} className={styles.PriceComponent_tableColor} style={{ left: (cell.length > 3) ? `${1 * index + 4}vw` : `${1.4 * index + 4}vw`, backgroundColor: item }}></div>
                    )) : null
                }
            </div>
        )
    }

    const nameFormatter = (cell, row, index) => {
        return (
            <>

                {cell ? (
                    <>
                        <p className={styles.PriceComponent_tableNamePersian}>{cell.persianName}</p>
                        <p className={`${styles.PriceComponent_tableNameEnglish} PriceComponent_tableNameEnglish_color_${brand}`}>{cell.englishName}</p>
                        <p className={`${styles.PriceComponent_tableSmallPlus} PriceComponent_tableNameEnglish_color_${brand}`}>{cell.ram}/{cell.ram}</p>
                    </>
                ) :
                    null
                }
            </>
        )
    }
    const priceFormatter = (cell) => {
        return (
            <>
                {cell ? (
                    <>
                        <span className={styles.PriceComponent_tableChangePrice} style={{ color: (cell.tag === "green" ? "#68D362" : (cell.tag === "red" ? "#E00000" : "#9B9B9B")) }}>{priceMarginColorize(cell.price.changePrice)}</span>
                        <p className={styles.PriceComponent_tablePrice}>{numDiscriminant(cell.price.price)}</p>
                    </>
                ) : null}
            </>
        )
    }
    const chartFormatter = (cell) => {
        return (
            <PriceComponent_tableChart dataChart={cell} />
        )
    }
    const ramFormatter = (cell) => {
        return (
            <p className={`${styles.PriceComponent_tableRam} `}>{cell}</p>
        )
    }
    const garanteeFormatter = (cell) => {
        return (
            <>
                <p className={`${styles.PriceComponent_tableGarantee} ${styles.PriceComponent_tableSmallPlus} `}>{cell.comment}</p>
                <p className={`${styles.PriceComponent_tableGarantee} `}>{cell.garantee}</p>
            </>
        )
    }
    const commentFormatter = (cell) => {
        return (
            <p className={styles.PriceComponent_tableComment}>{cell}</p>
        )
    }
    const caretFormatter = (cell) => {
        return (
            <i className="fa fa-chevron-circle-up fa-2x" style={{
                marginRight: '-33px',
                paddingLeft: '21vw',
                paddingTop: '10px'
            }}></i>
        )
    }
    const moreFormatter = (cell) => {
        return (
            <i className="fa fa-info-circle fa-2x" style={{ marginTop: '3vw' }}></i>
        )
    }
    // const products = []
    // tableData.forEach(table => {
    //     products.push({
    //         more:"",
    //         icon:table.logo,
    //         name:table,
    //         ram:table.ram,
    //         color:table.backColor,
    //         price:table,
    //         garantee:table.garantee,
    //         comment:table.comment,
    //         chart:table.chartData
    //     },
    //     {
    //         caret:"",
    //         color:table.backColor,
    //         garantee:table.garantee
    //     })
    //   });
    const products = [

        { more: "", icon: tableData[0].logo, name: 0, ram: tableData[0].ram, color: tableData[0].backColor, price: tableData[0], garantee: tableData[0].garantee, comment: tableData[0].comment, chart: tableData[0].chartData },
        { caret: "", color: tableData[0].backColor, garantee: tableData[0] },
        { more: "", icon: tableData[1].logo, name: 1, ram: tableData[1].ram, color: tableData[1].backColor, price: tableData[1], garantee: tableData[1].garantee, comment: tableData[1].comment, chart: tableData[1].chartData },
        { color: tableData[1].backColor, garantee: tableData[1] },
        { more: "", icon: tableData[2].logo, name: 2, ram: tableData[2].ram, color: tableData[2].backColor, price: tableData[2], garantee: tableData[2].garantee, comment: tableData[2].comment, chart: tableData[2].chartData },
        { color: tableData[2].backColor, garantee: tableData[2] }


    ]
    const PName = []
    tableData.forEach(table => {
      PName.push(`${table.persianName}`)
    });
    const EName = []
    tableData.forEach(table => {
      EName.push(`${table.englishName}`)
    });
    const columns = [
        {
            dataField: 'more',
            searchable: false,
            formatter: moreFormatter,
            events: {
                onMouseEnter: (e, column, columnIndex, row, rowIndex) => {
                    setRowIndex(rowIndex + 1),
                        console.log(RowIndex)

                },
            },
            headerClasses: `${styles.PriceComponent_table_more}`,
            headerStyle: () => {
                if (isMobile) {
                    return { width: "15%" };
                }
            },
            classes: (cell, row, rowIndex, colIndex) => {
                for (let n = 0; n < products.length; n += 2) {
                    if (rowIndex == n) {
                        return `${styles.PriceComponent_table_more}`;
                    }
                };
                for (let n = 1; n < products.length; n += 2) {
                    if (rowIndex == n) {
                        return `${styles.PriceComponent_table_moreOdd}`;
                    }
                }
            },

        },
        {
            dataField: 'icon',
            text: 'نام برند',
            searchable: false,
            formatter: imageFormatter,
            headerStyle: () => {
                if (isMobile) {
                    return { width: "20%" };
                }
            },
        }, {
            dataField: 'name',
            text: 'نام محصول',
            // sort: true,
            align: 'center',
            // formatExtraData : {value1: tableData[0].persianName, value2:tableData[0].englishName},
            // formatter: nameFormatter,
            // filter: textFilter(),
            formatter: (cell, row) =>{return(
                <div>
                    <p>{PName[cell]}</p>
                    <p>{EName[cell]}</p>
                </div>
                )}, 
            filterValue: (cell, row) => [PName[cell],EName[cell]] ,
                // formatter:() => isMobile? smallNameFormatter : nameFormatter,
            headerStyle: () => {
                if (isMobile) {
                    return {
                        width: "30%",
                        textAlign: "start"
                    };
                }
            },

        }, {
            dataField: 'ram',
            text: 'رم/حافظه',
            // sort: true,
            formatter: ramFormatter,
            headerClasses: `${styles.PriceComponent_table_header}`,
            classes: (cell, row, rowIndex, colIndex) => {
                for (let n = 0; n < products.length; n += 2) {
                    if (rowIndex == n) {
                        return `${styles.PriceComponent_table_header}`;
                    }
                }
            },
        },
        {
            dataField: 'caret',
            formatter: caretFormatter,
            events: {
                onClick: (e, column, columnIndex, row, rowIndex) => {
                    setRowIndex(rowIndex + 1),
                        console.log(RowIndex)

                },
            },
            headerClasses: `${styles.PriceComponent_table_moreOdd}`,
            classes: (cell, row, rowIndex, colIndex) => {
                for (let n = 0; n < products.length; n += 2) {
                    if (rowIndex == n) {
                        return `${styles.PriceComponent_table_moreOdd}`;
                    }
                }
            },
            headerStyle: () => {
                if (isMobile) {
                    return {
                        width: "10%",
                        textAlign: "start"
                    };
                }
            },
        },
        {
            dataField: 'color',
            text: 'رنگ',
            searchable: false,
            formatter: colorFormatter,
            headerClasses: `${styles.PriceComponent_table_header}`,
            classes: (cell, row, rowIndex, colIndex) => {
                for (let n = 0; n < products.length; n += 2) {
                    if (rowIndex == n) {
                        return `${styles.PriceComponent_table_header}`;
                    }
                }
            },
            headerStyle: () => {
                if (isMobile) {
                    return {
                        width: "50%",
                        textAlign: "start"
                    };
                }
            },
            style: () => {
                if (isMobile) {
                    return {
                        position: "relative",
                        paddingTop: '0px',
                        paddingRight: '6vw',
                    };
                } else {
                    return {
                        position: "relative"
                    }
                }
            }
        }, {
            dataField: 'price',
            text: 'قیمت/تومان',
            sort: true,
            sortFunc: (a, b, order) => {
                if (order === 'desc') return a.price.price > b.price.price ? -1 : 1;
                else { return a.price.price > b.price.price ? 1 : -1 };
            },
            headerFormatter: (column, index, { sortElement, filterElement }) => {
                // const { caret = 'x' } = sortElement.props;
                return (
                    <div className={styles.PriceComponent_tableHeaderCaret}>
                        {column.text} {sortElement}
                    </div>
                );
            },

            formatter: priceFormatter,
            headerStyle: () => {
                if (isMobile) {
                    return {
                        width: "35%",
                        textAlign: "start"
                    };
                }
            },
        }, {
            dataField: 'garantee',
            text: 'گارانتی',
            formatter: garanteeFormatter,
            // filterValue: (cell, row) => cell,
            headerClasses: `${styles.PriceComponent_table_header}`,
            classes: (cell, row, rowIndex, colIndex) => {
                for (let n = 0; n < products.length; n += 2) {
                    if (rowIndex == n) {
                        return `${styles.PriceComponent_table_header}`;
                    }
                }
            },
            style: () => {
                if (isMobile) {
                    return {
                        paddingRight: '16vw',
                        paddingTop: '0px',
                        paddingLeft: '19vw',
                    }
                }

            },
            headerStyle: () => {
                if (isMobile) {
                    return {
                        width: "40%",
                        textAlign: "start"
                    };
                }
            }
        }, {
            dataField: 'comment',
            text: 'توضیحات',
            formatter: commentFormatter,
            headerClasses: `${styles.PriceComponent_table_header}`,
            classes: (cell, row, rowIndex, colIndex) => {
                for (let n = 0; n < products.length; n += 2) {
                    if (rowIndex == n) {
                        return `${styles.PriceComponent_table_header}`;
                    }
                }
            },

        }, {
            dataField: 'chart',
            text: 'نمودار',
            formatter: chartFormatter,
            headerClasses: `${styles.PriceComponent_table_header}`,
            classes: (cell, row, rowIndex, colIndex) => {
                for (let n = 0; n < products.length; n += 2) {
                    if (rowIndex == n) {
                        return `${styles.PriceComponent_table_header}`;
                    }
                }
            },

        }];
    const singleColumns = [{
        dataField: 'name',
        text: 'نام محصول',
        // sort: true,
        align: 'center',

        formatter: nameFormatter,

    }, {
        dataField: 'ram',
        text: 'رم/حافظه',
        // sort: true,

        formatter: ramFormatter,

    }, {
        dataField: 'color',
        text: 'رنگ',
        formatter: colorFormatter,
        style: {
            position: "relative",
        }
    }, {
        dataField: 'price',
        text: 'قیمت/تومان',
        sort: true,
        sortFunc: (a, b, order) => {
            if (order === 'desc') return a.price.price > b.price.price ? -1 : 1;
            else { return a.price.price > b.price.price ? 1 : -1 };
        },
        formatter: priceFormatter,

    }, {
        dataField: 'garantee',
        text: 'گارانتی',
        formatter: garanteeFormatter,
    }, {
        dataField: 'comment',
        text: 'توضیحات',
        formatter: commentFormatter,

    }, {
        dataField: 'chart',
        text: 'نمودار',
        formatter: chartFormatter,
        searchable: false,
    }];
    const defaultSorted = [{
        dataField: 'price',
        order: 'desc'
    }];


    const [myValue, setMyValue] = useState('all')

    // expand row

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
    // const m =useCallback (() => {
    //     // setProducts(...products);
    //     console.log("salam man change shodam")
    // }, []);

    // const rowEvents = {
    //     onClick: (e, row, rowIndex) => {
    //         setRowIndex(rowIndex+1),
    //         console.log(RowIndex)

    //     },
    // }
    const rowClasses = (row, rowIndex) => {
        let classes = null;
        for (let n = 1; n < products.length; n += 2) {
            if (n == rowIndex) {
                classes = `${styles.PriceComponent_table_hide}`;
            }

        };
        if (RowIndex % 2 !== 0) {
            if (rowIndex === RowIndex) {
                console.log(`rowIndex:${rowIndex} RowIndex:${RowIndex}`)
                classes = `${styles.PriceComponent_table_hide} ${styles.PriceComponent_table_show}`;
            }
        }

        return classes;
    };
    const customMatchFunc=(newResult) => {
          
    //     if (typeof value !== 'undefined') {
    //     //   return value.startsWith(searchText);
    //     console.log(searchText)

    // }
        return console.log(newResult);
      }
    return (

        <ToolkitProvider
            keyField="id"
            data={products}
            columns={brand === "AllBrand" ? columns : singleColumns}
            // search={ { searchFormatted: true } }
            search={ { customMatchFunc } }
            defaultSorted={defaultSorted}
            // filter={ filterFactory()}
        >
            {
                props => {

                    const TableBottomHeader = () => {
                        if (brand === "AllBrand") {
                            return (
                                <div className={`${styles.priceComponent_tableSearchContainer} row`}>
                                    <div className={`${styles.PriceComponent_tableSearch} col-md-3 col-sm-4 col-4`}>


                                        <SearchBar
                                            {...props.searchProps}
                                            placeholder="جستجو..."
                                            className={`${styles.priceComponent_tableSearchBox}  `}
                                            delay={10}
                                        />
                                        <img className={styles.priceComponent_tableSearchBoxImg} src="/images/sreach.png" />
                                    </div>
                                    <div className={`${styles.priceComponent_tableMenu} col-md-9 col-sm-8 col-8`}>
                                        <div className={`${styles.overflow_ba} row`} id="myDIV">
                                            <div className="col-sm-6 col-6">
                                                <div className="row">
                                                    <div className="col-sm-3 col-3"></div>
                                                    <a className={`${styles.priceComponent_tableMenuChild} col-sm-3 col-3 ${(myValue === "honor") ? styles.priceComponent_tableMenuChildHovered : ''}`} onClick={() => { changeTableData("honor"), setMyValue("honor") }}>
                                                        <img src={brands[6].url} className={`${styles.priceComponent_tableMenuChildImg} ${styles.img_size}`} alt="honor" />
                                                    </a>
                                                    <a className={`${styles.priceComponent_tableMenuChild} col-sm-3 col-3 ${(myValue === "nokia") ? styles.priceComponent_tableMenuChildHovered : ''}`} onClick={() => { changeTableData("nokia"), setMyValue("nokia") }}>
                                                        <img src={brands[5].url} className={styles.priceComponent_tableMenuChildImg} alt="nokia" />
                                                    </a>
                                                    <a className={`${styles.priceComponent_tableMenuChild} col-sm-3 col-3 ${(myValue === "mi") ? styles.priceComponent_tableMenuChildHovered : ''}`} onClick={() => { changeTableData("mi"), setMyValue("mi") }}>
                                                        <img src={brands[4].url} className={styles.priceComponent_tableMenuChildImg} alt="mi" />
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="col-sm-6 col-6">
                                                <div className="row">
                                                    <a className={`${styles.priceComponent_tableMenuChild} col-sm-3 col-3 ${(myValue === "huawei") ? styles.priceComponent_tableMenuChildHovered : ''}`} onClick={() => { changeTableData("huawei"), setMyValue("huawei") }}>
                                                        <img src={brands[3].url} className={styles.priceComponent_tableMenuChildImg} alt="huawei" />
                                                    </a>
                                                    <a className={`${styles.priceComponent_tableMenuChild} col-sm-3 col-3 ${(myValue === "samsung") ? styles.priceComponent_tableMenuChildHovered : ''}`} onClick={() => { changeTableData("samsung"), setMyValue("samsung") }}>
                                                        <img src={brands[2].url} className={styles.priceComponent_tableMenuChildImg} alt="samsung" />
                                                    </a>
                                                    <a className={`${styles.priceComponent_tableMenuChild} col-sm-3 col-3 ${(myValue === "apple") ? styles.priceComponent_tableMenuChildHovered : ''}`} onClick={() => { changeTableData("apple"), setMyValue("apple") }} >
                                                        <img src={brands[1].url} className={`${styles.priceComponent_tableMenuChildImg} ${styles.priceComponent_tableMenuChildImgApple}`} alt="apple" />
                                                    </a>
                                                    <a className={`${styles.priceComponent_tableMenuChild} col-sm-3 col-3 ${(myValue === "all") ? styles.priceComponent_tableMenuChildHovered : ''}`} onClick={() => { changeTableData("all"), setMyValue("all") }}>
                                                        <p>{brands[0].name}</p>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    }
                    const TableBottom = () => {
                        if (brand === "AllBrand") {
                            console.log(isMobile)
                            console.log("expandable")
                            return (
                                <BootstrapTable
                                    {...props.baseProps}
                                    bordered={false}
                                    hover
                                    id={styles.table}
                                    bodyClasses={`${styles.priceComponent_tableBody} priceComponent_tableBody_color_${brand}`}
                                    headerWrapperClasses={`${styles.priceComponent_tableHeader} priceComponent_tableHeader_color_${brand}`}
                                    rowClasses={rowClasses}
                                />
                            )
                        }
                        else {
                            return (
                                <div className={styles.PriceComponent_tableContainerSingleBrand}>
                                    <div className={styles.PriceComponent_tableBodyContainer}>
                                        <BootstrapTable
                                            {...props.baseProps}
                                            bordered={false}
                                            hover
                                            id={styles.table}
                                            bodyClasses={`${styles.priceComponent_tableBody} priceComponent_tableBody_color_${brand}`}
                                            headerWrapperClasses={`${styles.priceComponent_tableHeader} priceComponent_tableHeader_color_${brand}`}
                                            // rowClasses={styles.PriceComponent_tableRow}
                                            rowClasses={rowClasses}

                                        />
                                    </div>
                                    <div className={`${styles.PriceComponent_tableLeftBrand} priceComponent_tableLeftBrand_${brand}`}>
                                        <img src={"/images/mi/mi-logo-listSide.png"} className={styles.PriceComponent_tableSideImage}></img>
                                    </div>
                                </div>
                            )
                        }
                    }
                    return (
                        <div className={`${styles.priceComponent_tableContainer} priceComponent_tableContainer_color_${brand}`}>
                            {TableBottomHeader()}
                            {TableBottom()}
                            {/* {console.log(PName)}

                            {console.log(EName)} */}
                        </div>
                    )
                }
            }
        </ToolkitProvider>

    )
}


export default PriceComponent_table

