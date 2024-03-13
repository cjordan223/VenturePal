// import React from 'react';
// import Card from 'react-bootstrap/Card';
// import Col from 'react-bootstrap/Col';
// import Row from 'react-bootstrap/Row';
//
// const NatureSpotsGrid = ({ natureSpots, onEdit, onDelete }) => {
//     return (
//         <Row xs={1} md={2} lg={3} className="g-4">
//             {natureSpots.map((spot, index) => (
//                 <Col key={spot.id}>
//                     <Card>
//                         <Card.Img variant="top" src={spot.imageUrl} />
//                         <Card.Body>
//                             <Card.Title>{spot.name}</Card.Title>
//                             <Card.Text>
//                                 {spot.description}
//                             </Card.Text>
//                             <button onClick={() => onEdit(index)}>Edit</button>
//                             <button onClick={() => onDelete(index)}>Delete</button>
//                         </Card.Body>
//                     </Card>
//                 </Col>
//             ))}
//         </Row>
//     );
// };
//
// export default NatureSpotsGrid;
