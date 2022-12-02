import { React, useState, useEffect } from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
import styles from './priceComponent_table.module.scss';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import PriceComponent_tableChart from './priceComponent_tableChart';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';



function PriceComponent_table({ brands, tableData, brand ,setSelectedTableBrands , bottomBlueLine, setBottomBlueLine}) {
    const { SearchBar } = Search;
    const [isMobile, setIsMobile] = useState(false);
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

    const nameFormatter = (cell, row) => {
        return (
            <>

                {row ? (
                    <>
                    {console.log(row)}
                        {/* <p className={styles.PriceComponent_tableNamePersian}>{PName[cell[0]]}</p> */}
                        <p className={styles.PriceComponent_tableNamePersian}>{row.persianName}</p>
                        {/* <p className={`${styles.PriceComponent_tableNameEnglish} PriceComponent_tableNameEnglish_color_${brand}`}>{EName[cell[0]]}</p> */}
                        <p className={`${styles.PriceComponent_tableNameEnglish} PriceComponent_tableNameEnglish_color_${brand}`}>{row.englishName}</p>
                        {/* <p className={`${styles.PriceComponent_tableSmallPlus} PriceComponent_tableNameEnglish_color_${brand}`}>{Ram[cell[0]]}/{Ram[cell[0]]}</p> */}
                    </>
                ) :
                    null
                }
            </>
        )
    }
    const priceFormatter = (cell, row, rowIndex) => {
        return (
            <>
                {row ? (
                    <>
                        {/* <span className={styles.PriceComponent_tableChangePrice} style={{ color: (tableData[rowIndex].tag === "green" ? "#68D362" : (tableData[rowIndex].tag === "red" ? "#E00000" : "#9B9B9B")) }}>{priceMarginColorize(CPrice[cell])}</span>
                        <p className={styles.PriceComponent_tablePrice}>{numDiscriminant(PPrice[cell])}</p> */}
                        <span className={styles.PriceComponent_tableChangePrice} style={{ color: (tableData[rowIndex].tag === "green" ? "#68D362" : (tableData[rowIndex].tag === "red" ? "#E00000" : "#9B9B9B")) }}>{priceMarginColorize(row.price.changePrice)}</span>
                        <p className={styles.PriceComponent_tablePrice}>{numDiscriminant(row.price.price)}</p>
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
                <p className={`${styles.PriceComponent_tableGarantee} `}>{cell}</p>
            </>
        )
    }
    const commentFormatter = (cell) => {
        return (
            <p className={styles.PriceComponent_tableComment}>{cell}</p>
        )
    }
    // const caretFormatter = (cell) => {
    //     return (
    //         <i className="fa fa-chevron-circle-up fa-2x" style={{
    //             marginRight: '-33px',
    //             paddingLeft: '21vw',
    //             paddingTop: '10px'
    //         }}></i>
    //     )
    // }
    // const moreFormatter = (cell) => {
    //     return (
    //         <i className="fa fa-info-circle fa-2x" style={{ marginTop: '3vw' }}></i>
    //     )
    // }
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
    // const products =tableData.map((table,index) => ([{id:index,icon: table[index].logo,name: [index,brand],ram: table[index].ram, color: table[index].backColor, price: index, garantee: table[index].garantee, comment: table[index].comment, chart: table[index].chartData}]))
    // const products = [...tableData]
    // const products = [
    //     { id: 0, logo: tableData[0].logo, name: [0,brand], ram: tableData[0].ram, color: tableData[0].backColor, price: 0, garantee: tableData[0].garantee, comment: tableData[0].comment, chart: tableData[0].chartData },
    //     { id: 1, logo: tableData[1].logo, name: [1,brand], ram: tableData[1].ram, color: tableData[1].backColor, price: 1, garantee: tableData[1].garantee, comment: tableData[1].comment, chart: tableData[1].chartData },
    //     { id: 2, logo: tableData[2].logo, name: [2,brand], ram: tableData[2].ram, color: tableData[2].backColor, price: 2, garantee: tableData[2].garantee, comment: tableData[2].comment, chart: tableData[2].chartData },

    // ]
    // const PName = []
    // const EName = []
    // const PPrice = []
    // const CPrice = []
    // const Ram = []
    // tableData.forEach(table => {
    //     PName.push(`${table.persianName}`)
    //     EName.push(`${table.englishName}`)
    //     PPrice.push(`${table.price.price}`)
    //     CPrice.push(`${table.price.changePrice}`)
    //     Ram.push(`${table.ram}`)

    // });
    const columns = [
        {
            dataField: 'logo',
            text: 'نام برند',
            searchable: false,
            formatter: imageFormatter,
            headerStyle: () => {
                if (isMobile) {
                    return { width: "20%" };
                }
            },
        },
        {
            dataField: 'name',
            text: 'نام محصول',
            align: 'center',
            // formatExtraData : {value1: tableData[0].persianName, value2:tableData[0].englishName},
            formatter: nameFormatter,
            // formatter: (cell, row) =>(
            //     <div>
            //         <p>{PName[cell]}</p>
            //         <p>{EName[cell]}</p>
            //     </div>
            //     ), 
            filterValue: (cell, row) => [row.persianName, row.englishName],
            headerStyle: () => {
                if (isMobile) {
                    return {
                        width: "30%",
                        textAlign: "start"
                    };
                }
            },

        },
        {
            dataField: 'ram',
            text: 'رم/حافظه',
            // sort: true,
            formatter: ramFormatter,
            headerClasses: `${styles.PriceComponent_table_header}`,
            classes: `${styles.PriceComponent_table_header}`
        },
        {
            dataField: 'backColor',
            text: 'رنگ',
            searchable: false,
            formatter: colorFormatter,
            headerClasses: `${styles.PriceComponent_table_header}`,
            classes: `${styles.PriceComponent_table_header}`,
        },
        {
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
                        <p>{column.text}</p>
                        {sortElement}
                    </div>
                );
            },

            formatter: priceFormatter,
            filterValue: (cell, row) => [row.price.price, row.price.changePrice],
            headerStyle: () => {
                if (isMobile) {
                    return {
                        width: "35%",
                        textAlign: "start"
                    };
                }
            },
        },
        {
            dataField: 'garantee',
            text: 'گارانتی',
            formatter: garanteeFormatter,
            headerClasses: `${styles.PriceComponent_table_header}`,
            classes: `${styles.PriceComponent_table_header}`,
        },
        {
            dataField: 'comment',
            text: 'توضیحات',
            formatter: commentFormatter,
            headerClasses: `${styles.PriceComponent_table_header}`,
            classes: `${styles.PriceComponent_table_header}`,

        },
        {
            dataField: 'chartData',
            text: 'نمودار',
            formatter: chartFormatter,
            headerClasses: `${styles.PriceComponent_table_header}`,
            classes: `${styles.PriceComponent_table_header}`,

        }
    ];
    const isMobileColumns = [
        {
            dataField: 'logo',
            text: 'نام برند',
            searchable: false,
            formatter: imageFormatter,
            headerStyle: () => {
                if (isMobile) {
                    return { width: "20%" };
                }
            },
        },
        {
            dataField: 'name',
            text: 'نام محصول',
            align: 'center',
            // formatExtraData : {value1: tableData[0].persianName, value2:tableData[0].englishName},
            formatter: nameFormatter,
            // formatter: (cell, row) =>(
            //     <div>
            //         <p>{PName[cell]}</p>
            //         <p>{EName[cell]}</p>
            //     </div>
            //     ), 
            // filterValue: (cell, row) => [PName[cell], EName[cell]],
            filterValue: (cell, row) => [row.persianName, row.englishName],
            headerStyle: () => {
                if (isMobile) {
                    return {
                        width: "30%",
                        textAlign: "start"
                    };
                }
            },

        },
        {
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
                        <p>{column.text}</p>
                        {sortElement}
                    </div>
                );
            },

            formatter: priceFormatter,
            // filterValue: (cell, row) => [PPrice[cell], CPrice[cell]],
            filterValue: (cell, row) => [row.price.price, row.price.changePrice],
            headerStyle: () => {
                if (isMobile) {
                    return {
                        width: "35%",
                        textAlign: "start"
                    };
                }
            },
        }
    ];
    const singleColumns = [
        {
            dataField: 'name',
            text: 'نام محصول',
            align: 'center',
            // formatExtraData : {value1: tableData[0].persianName, value2:tableData[0].englishName},
            formatter: nameFormatter,
            // formatter: (cell, row) =>(
            //     <div>
            //         <p>{PName[cell]}</p>
            //         <p>{EName[cell]}</p>
            //     </div>
            //     ), 
            // filterValue: (cell, row) => [PName[cell], EName[cell]],
            filterValue: (cell, row) => [row.persianName, row.englishName],
            headerStyle: () => {
                if (isMobile) {
                    return {
                        width: "30%",
                        textAlign: "start"
                    };
                }
            },

        },
        {
            dataField: 'ram',
            text: 'رم/حافظه',
            // sort: true,
            formatter: ramFormatter,
            headerClasses: `${styles.PriceComponent_table_header}`,
            classes: `${styles.PriceComponent_table_header}`
        },
        {
            dataField: 'color',
            text: 'رنگ',
            searchable: false,
            formatter: colorFormatter,
            headerClasses: `${styles.PriceComponent_table_header}`,
            classes: `${styles.PriceComponent_table_header}`,
        },
        {
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
                        <p>{column.text}</p>
                        {sortElement}
                    </div>
                );
            },

            formatter: priceFormatter,
            // filterValue: (cell, row) => [PPrice[cell], CPrice[cell]],
            filterValue: (cell, row) => [row.price.price, row.price.changePrice],
            headerStyle: () => {
                if (isMobile) {
                    return {
                        width: "35%",
                        textAlign: "start"
                    };
                }
            },
        },
        {
            dataField: 'garantee',
            text: 'گارانتی',
            formatter: garanteeFormatter,
            headerClasses: `${styles.PriceComponent_table_header}`,
            classes: `${styles.PriceComponent_table_header}`,
        },
        {
            dataField: 'comment',
            text: 'توضیحات',
            formatter: commentFormatter,
            headerClasses: `${styles.PriceComponent_table_header}`,
            classes: `${styles.PriceComponent_table_header}`,

        },
        {
            dataField: 'chart',
            text: 'نمودار',
            formatter: chartFormatter,
            headerClasses: `${styles.PriceComponent_table_header}`,
            classes: `${styles.PriceComponent_table_header}`,

        }
    ];
    const isMobileSingleColumns = [
        {
            dataField: 'logo',
            text: 'نام برند',
            searchable: false,
            formatter: imageFormatter,
            headerStyle: () => {
                if (isMobile) {
                    return { width: "20%" };
                }
            },
        },
        {
            dataField: 'name',
            text: 'نام محصول',
            align: 'center',
            // formatExtraData : {value1: tableData[0].persianName, value2:tableData[0].englishName},
            formatter: nameFormatter,
            // formatter: (cell, row) =>(
            //     <div>
            //         <p>{PName[cell]}</p>
            //         <p>{EName[cell]}</p>
            //     </div>
            //     ), 
            // filterValue: (cell, row) => [PName[cell], EName[cell]],
            filterValue: (cell, row) => [row.persianName, row.englishName],
            headerStyle: () => {
                if (isMobile) {
                    return {
                        width: "30%",
                        textAlign: "start"
                    };
                }
            },

        },
        {
            dataField: 'prices',
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
                        <p>{column.text}</p>
                        {sortElement}
                    </div>
                );
            },

            formatter: priceFormatter,
            // filterValue: (cell, row) => [PPrice[cell], CPrice[cell]],
            filterValue: (cell, row) => [row.price.price, row.price.changePrice],
            headerStyle: () => {
                if (isMobile) {
                    return {
                        width: "35%",
                        textAlign: "start"
                    };
                }
            },
        }
    ];

    const defaultSorted = [{
        dataField: 'price',
        order: 'desc'
    }];

    useEffect(() => {
        if (window.innerWidth < 600) {
            setIsMobile(true);
            console.log("is true");
            window.addEventListener("resize", () => {
            if (window.innerWidth < 600) {
                setIsMobile(true);
            } else {
                setIsMobile(false);
            }
        }, false);
        } else {
            setIsMobile(false);
            console.log("is false");
            window.addEventListener("resize", () => {
                if (window.innerWidth < 600) {
                    setIsMobile(true);
                } else {
                    setIsMobile(false);
                }
            }, false);
        }
    }, []);

    // expand row

    const expandRow = {
        // onlyOneExpanding: true,
        className: `${styles.PriceComponent_table_expanded} `,
        renderer: (row, rowIndex) => {
            var table = []
            table.push({
                comment: tableData[rowIndex].comment,
                garantee: tableData[rowIndex].garantee,
                backColor: tableData[rowIndex].backColor
            })
            return (
                <div >
                    {console.log(table)}
                    {table.map(table => (
                        <div className={`d-flex`}>
                            {/* <div>{table.backColor}</div> */}
                            <div className={`${styles.PriceComponent_tableColorContainer} w-50`}>
                                {table.backColor ?

                                table.backColor.map((item, index) => (
                                        <div key={index} className={styles.PriceComponent_tableColor} style={{ left: (item.length > 3) ? `${1 * index + 4}vw` : `${1.4 * index + 4}vw`, backgroundColor: item }}></div>
                                    )) : null
                                }
                            </div>
                            <div style={{width:'35vw'}}>
                                <p className={`${styles.PriceComponent_tableRam} `} >{table.comment}</p>
                                <p className={styles.PriceComponent_tableComment}>{table.garantee}</p>
                            </div>
                        </div>
                    ))}
                </div>

            )
        },
        showExpandColumn: isMobile ? true : false,
        expandByColumnOnly: true,
        expandHeaderColumnRenderer: ({ isAnyExpands }) => {
            if (isAnyExpands) {
              return null;
            }
            return null;
          },
          expandColumnRenderer: ({ expanded }) => {
            if (expanded) {
              return (
                <b>
                <i className={`fa fa-chevron-circle-up fa-2x PriceComponent_tableNameEnglish_color_${brand}`} style={{
                paddingTop: '10px'
            }}></i>
                </b>
              );
            }
            return (
              <b><i className={`fa fa-info-circle fa-2x PriceComponent_tableNameEnglish_color_${brand}`} style={{ marginTop: '3vw' }}></i></b>
            );
          }
    };

    return (

        <ToolkitProvider
            keyField="id"
            data={tableData}
            columns={brand === "AllBrand" ? isMobile? isMobileColumns:columns : isMobile? isMobileColumns:singleColumns}
            // columns={columns}
            search
            defaultSorted={defaultSorted}
        >
            {
                props => {

                    const TableBottomHeader = () => {
                        if (brand === "AllBrand") {
                            return (
                                <div className={`${styles.priceComponent_tableSearchContainer} justify-content-between d-flex mx-3`}>
                                    <div className={`${styles.PriceComponent_tableSearch}`}>


                                        <SearchBar
                                            {...props.searchProps}
                                            placeholder="جستجو..."
                                            className={`${styles.priceComponent_tableSearchBox}  `}
                                            delay={10}
                                        />
                                        <img className={styles.priceComponent_tableSearchBoxImg} src="/images/sreach.png" />
                                    </div>
                                    <div className={`${styles.priceComponent_listBrands_container} ${styles.overflow_ba} `}>
                                        <div className={`align-items-center d-flex`}  id="myDIV">
                                                    <div className="me-3"></div>
                                                    <a className={`mt-4 ${styles.priceComponent_tableMenuChildImg} ${(bottomBlueLine === "honor") ? styles.priceComponent_tableMenuChildHovered : ''}`} onClick={() => {  setBottomBlueLine("honor"),setSelectedTableBrands("honor") }}>
                                                        <img src={brands[6].url} className={` ${styles.img_size} ${styles.img_sizeHonor}`} alt="honor" />
                                                    </a>
                                                    <a className={`mt-4 ${styles.priceComponent_tableMenuChildImg} ${(bottomBlueLine === "nokia") ? styles.priceComponent_tableMenuChildHovered : ''}`} onClick={() => { setBottomBlueLine("nokia"),setSelectedTableBrands("nokia") }}>
                                                        <img src={brands[5].url} className={` ${styles.img_size}`} alt="nokia" />
                                                    </a>
                                                    <a className={`mt-4 ${styles.priceComponent_tableMenuChildImg} ${(bottomBlueLine === "mi") ? styles.priceComponent_tableMenuChildHovered : ''}`} onClick={() => {  setBottomBlueLine("mi"),setSelectedTableBrands("mi") }}>
                                                        <img src={brands[4].url} className={` ${styles.img_size}`} alt="mi" />
                                                    </a>
                                                    <a className={`mt-4 ${styles.priceComponent_tableMenuChildImg} ${(bottomBlueLine === "huawei") ? styles.priceComponent_tableMenuChildHovered : ''}`} onClick={() => {  setBottomBlueLine("huawei"),setSelectedTableBrands("huawei") }}>
                                                        <img src={brands[3].url} className={` ${styles.img_size}`} alt="huawei" />
                                                    </a>
                                                    <a className={`mt-4 ${styles.priceComponent_tableMenuChildImg} ${(bottomBlueLine === "samsung") ? styles.priceComponent_tableMenuChildHovered : ''}`} onClick={() => {  setBottomBlueLine("samsung") ,setSelectedTableBrands("samsung")}}>
                                                        <img src={brands[2].url} className={` ${styles.img_size}`} alt="samsung" />
                                                    </a>
                                                    <a className={`mt-4 ${styles.priceComponent_tableMenuChildImg} ${(bottomBlueLine === "apple") ? styles.priceComponent_tableMenuChildHovered : ''}`} onClick={() => {  setBottomBlueLine("apple"),setSelectedTableBrands("apple") }} >
                                                        <img src={brands[1].url} className={` ${styles.img_size} ${styles.priceComponent_tableMenuChildImgApple}`} alt="apple" />
                                                    </a>
                                                    <a className={`text-decoration-none pb-4 mt-4 ${styles.priceComponent_tableMenuChildImg} ${styles.PriceComponent_tableNamePersian} ${(bottomBlueLine === "all") ? styles.priceComponent_tableMenuChildHovered : ''}`} onClick={() => { setBottomBlueLine("all"),setSelectedTableBrands("all") }}>
                                                        <p className={` ${styles.img_size}`} style={{ whiteSpace: 'nowrap',marginTop: '-4px'}}>{brands[0].name}</p>
                                                    </a>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    }
                    const TableBottom = () => {
                        if (brand === "AllBrand") {
                            return (
                                <BootstrapTable
                                    {...props.baseProps}
                                    bordered={false}
                                    // hover
                                    id={styles.table}
                                    bodyClasses={`${styles.priceComponent_tableBody} priceComponent_tableBody_color_${brand}`}
                                    headerWrapperClasses={`${styles.priceComponent_tableHeader} priceComponent_tableHeader_color_${brand}`}
                                    
                                    expandRow={expandRow}

                                />
                            )
                        }
                        else {
                            if (isMobile) { 
                            return (
                                <BootstrapTable
                                {...props.baseProps}
                                bordered={false}
                                // hover
                                id={styles.table}
                                bodyClasses={`${styles.priceComponent_tableBody} priceComponent_tableBody_color_${brand}`}
                                headerWrapperClasses={`${styles.priceComponent_tableHeader} priceComponent_tableHeader_color_${brand}`}
                                headerClasses={isMobile? `${styles.priceComponent_tableHeaderIsMobileColor}` : ''}
                                expandRow={expandRow}

                            />
                            )} else{
                            return (
                                <div className={styles.PriceComponent_tableContainerSingleBrand}>
                                    <div className={styles.PriceComponent_tableBodyContainer}>
                                        <BootstrapTable
                                            {...props.baseProps}
                                            bordered={false}
                                            // hover
                                            id={styles.table}
                                            bodyClasses={`${styles.priceComponent_tableBody} priceComponent_tableBody_color_${brand}`}
                                            headerWrapperClasses={`${styles.priceComponent_tableHeader} priceComponent_tableHeader_color_${brand}`}
                                            headerClasses={isMobile? `${styles.priceComponent_tableHeaderIsMobileColor}` : ''}
                                            expandRow={expandRow}

                                        />
                                    </div>
                                    <div className={`${styles.PriceComponent_tableLeftBrand} priceComponent_tableLeftBrand_${brand} ${styles.PriceComponent_tableLeftBrandSmall}`}>
                                        <img src={"/images/mi/mi-logo-listSide.png"} className={styles.PriceComponent_tableSideImage}></img>
                                    </div>
                                </div>
                            )
                            }
                        }
                    }
                    return (
                        <div className={`${styles.priceComponent_tableContainer} priceComponent_tableContainer_color_${brand}`}>
                            {TableBottomHeader()}
                            {TableBottom()}
                        </div>
                    )
                }
            }
        </ToolkitProvider>

    )
}


export default PriceComponent_table

