// import { useEffect } from 'react'
// import { useSelector, useDispatch } from 'react-redux'
// import { getPostData } from '../../store/post/postSlice'
// const permalink =
//   '/r/mildlyinfuriating/comments/s1gd86/jkfl_redddit_meta_posts/'


// const Comp = () => {
//   const disptach = useDispatch()
//   const { data } = useSelector((state) => state.post)
//   useEffect(() => {
//     disptach(getPostData(permalink))
//   }, [])

//   const requiredData = data.map(({ data }) => ({
//     author: data?.author,
//     body: data?.body,
//     body_html: data?.body_html,
//     created: data?.created,
//     utc: data?.created_utc,
//     up: data?.up,
//     score: data?.score,
//     name: data?.subreddit_name_prefixed,
//   }))
//   return (
//     <>
//       {requiredData.map((item) => {
//         return (
//           <ul key={item.created}>
//             <li>{item.author}</li>
//             <li>{item.body}</li>
//             <li>{new Date(item.created).toLocaleDateString()}</li>
//           </ul>
//         )
//       })}
//     </>
//   )
// }

// export default Comp

// // {data.map(({ data }) => {
// //   return (
// //     <ul>
// //       <li>{data.author}</li>
// //       <li>{data.body}</li>
// //       <li>{data.body_html}</li>
// //       <li>{new Date(data.created)}</li>
// //       <li>{new Date(data.created_utc)}</li>
// //       <li>{data.up}</li>
// //       <li>{data.score}</li>
// //       <li>{data.subreddit_name_prefixed}</li>
// //     </ul>
// //   )
// // // })}
