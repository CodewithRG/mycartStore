import { Typography } from '@material-ui/core'
import React,{useState, useEffect} from 'react'
import './Dashboard.css'
import Sidebar from './Sidebar.js'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch} from 'react-redux'
import { getAdminProducts} from '../../actions/productAction'

// import {Line , Doughnut } from 'react-chartjs-2'
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';
import { allOrders } from '../../actions/orderAction'


// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

const Dashboard = () => {
  const dispatch = useDispatch();
  const { products} = useSelector((state)=>state.products)
  const { orders } = useSelector((state)=>state.allOrders)
  const {users} = useSelector((state)=>state.allUsers)



  let outOfStock = 0;

  products && products.forEach((item)=>{
    if(item.stock === 0){
      outOfStock += 1;
    }
  })

  let totalPrice = 0;
  {orders && orders.forEach((item)=>{
    totalPrice += item.totalPrice
  })}


  
  // const [chartData, setChartData] = useState({});

  //   const chart = ()=> setChartData({
  //     labels: ["Initial Amount", "Amount Earned"],
  //     datasets: [
  //       {
  //         label: 'TOTAL AMOUNT',
  //         data: [0, 4000],
  //         backgroundColor: ['rgba(75, 192, 192, 0.6)'],
  //         borderWidth: 4,

  //       },
  //     ],
  //   });

    // const doughnutState = {
    //   labels: ["Out Of Stock", "InStock"],
    //   datasets: [{
    //       backgroundColor: ['#00A6B4', '#6800B4'],
    //       data: [2,5],
    //   }],
    // }

    useEffect(() => {
    dispatch(getAdminProducts());
    dispatch(allOrders());

      // chart();
      // console.log("thik...")
    }, []);

  return (
    <div className='dashboard'>
      <Sidebar/>
      <div className='dashboardContainer'>
          <Typography component="h1"> Dashboard </Typography>

          <div className='dashboardSummery'>
            <div>
              <p>Total Amount <br/> {totalPrice}</p>
            </div>
          </div>

          <div className='dashboardSummeryBox2'>
            <Link to="/admin/products">
              <p>Poducts <br/> {products && products.length}</p>
              
            </Link>
            <Link to="/admin/orders">
              <p>Oders <br/> {orders && orders.length}</p>
             
            </Link>
            <Link to="/admin/users">
              <p>Users <br/> {users && users.length}</p>
              
            </Link>
          </div>

          <div className='lineChart'>
            {/* <Line  /> */}

          </div>

          <div className='outOfStock'>
              <p>Products : Out Of Stock  <span className='ProductValue' > {outOfStock}</span> </p>
              <p>Products : In Stock    <span className='ProductValue' >{products && (products.length - outOfStock)}</span> </p>
          </div>
          

          <div>
          
      <div
        options={{
          responsive: true,
          plugins: {
            title: {
              display: false,
            },
          },
          maintainAspectRatio: false,
        }}
        data={{
          labels: ["Energy", "envi", "retail", "govt"],
          datasets: [
            {
              label: "Sector",
              data: [54, 36, 12, 45],
              backgroundColor: "rgba(53, 162, 235, 0.5)",
            },
          ],
        }}
        height={400}
        width={600}
      />
          </div>
      </div>
    </div>
  )
}

export default Dashboard