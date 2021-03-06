import React, {useState, useEffect} from 'react';
import axios from "axios";
import jwt from "jsonwebtoken";

//components
import CreateNAP from "./CreateNAP";
import EditNAP from "./EditNAP";
import DeleteNAP from "./DeleteNAP";

//markdown-it
var md = require("markdown-it")({html: true, linkify: true, typographer: true})
	.use(require("markdown-it-abbr"))
	.use(require("markdown-it-align"))
	.use(require("markdown-it-container"))
	.use(require("markdown-it-deflist"))
	.use(require("markdown-it-emoji"))
	.use(require("markdown-it-footnote"))
	.use(require("markdown-it-ins"))
	.use(require("markdown-it-mark"))
	.use(require('markdown-it-sub'))
	.use(require("markdown-it-sup"));

const ListFAQs = (props) => {
	const [NAP, setNAP] = useState([]);
	const [numCols, setNumCols] = useState([]);
	const [maxRows, setMaxRows] = useState(0);
	const [maxCols, setMaxCols] = useState(0);

	const addable = () => {
		const token = localStorage.getItem("user_logged");
		let isAdmin;
		if (token) {
			jwt.verify(token, "jerdan1980", function (err, decoded) {
				if (decoded) {
					isAdmin = decoded.user_info.isAdmin;
				}
			});
			if (isAdmin) {
				return <CreateNAP/>
			}
		}
	}

	const editable = (item) => {
		const token = localStorage.getItem("user_logged");
		let isAdmin;
		if (token) {
			jwt.verify(token, "jerdan1980", function (err, decoded) {
				if (decoded) {
					isAdmin = decoded.user_info.isAdmin;
				}
			});
			if (isAdmin) {
				return (
					<div>
						<EditNAP NAP={item} ID={item._id}/>
						<DeleteNAP NAP={item} ID={item._id}/>
					</div>
				)
			}
		}
	}

	useEffect(() => {
		axios.get(`/api/nap/get_nap`) 
			.then(res => {setNAP(res.data)});
	}, []);

	//builds the table
	useEffect(() => {
		//find the number of rows
		let rows = 0;
		NAP.forEach(item => {
			if (item.x > rows) {
				rows = item.x;
			}
		});
		//add 1 for code easiness
		rows++;
		
		//create empty array for cols
		//https://stackoverflow.com/questions/18947892/creating-range-in-javascript-strange-syntax
		let colArr = Array.apply(null, { length: rows }).map(function () {return 0});
		//set the number of columns in each row
		NAP.forEach(item => {
			if (colArr[item.x] < item.y) {
				colArr[item.x] = item.y;
			}
		});

		//find the biggest number of columns
		let cols = 0;
		colArr.forEach(item => {
			if( cols < item) {
				cols = item;
			}
		});

		//set all the vars
		setNumCols(colArr);
		setMaxRows(rows);
		setMaxCols(cols);
	}, [NAP]);
	
	return (
		<div class="flex mx-4">
			{addable()}
			<table class="table table-bordered">
				{
					//https://stackoverflow.com/questions/18947892/creating-range-in-javascript-strange-syntax
					Array.apply(null, { length: maxRows }).map(Number.call, Number).map(row => {
						return (
							<tr>
								{
									Array.apply(null, { length: numCols[row] }).map(Number.call, Number).map(col => {
										return (
											NAP.filter(item => item.x == row && item.y == col + 1).map(item => {
												let colSize = 1;
												if (numCols[row] < maxCols) {
													colSize += maxCols - numCols[row];
												}
												return(
													<td colSpan={colSize}>
														{editable(item)}
														{item.hasHeader ? <a class="font-weight-bold">{item.header}<br/></a> : <></>}
														{item.hasDescription ? <div dangerouslySetInnerHTML={{ __html: md.render(item.description) }}/> /*<ReactMarkdown source={item.description} escapeHtml={false}/>*/ : <></>}
														<a class="text-link" href={item.link}>{item.linkText}</a>
													</td>
												)
											})
										)
									})
								}
							</tr>
						)
					})
				}
			</table>
		</div>
	)
}

export default ListFAQs;