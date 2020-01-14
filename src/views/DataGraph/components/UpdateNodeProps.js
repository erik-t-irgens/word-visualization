import React from 'react';
import _ from 'lodash';

class UpdateNodeProps extends React.Component {

    // This checks the currently displayed nodes/edges (which are from sigma.graph), and compares them with the Redux store (when the store is updated). If there is a discrepency, the sigma graph is updated using its built-in addNode, addEdge, dropNode, and dropEdge functions, while also updating the Redux store with our own actions.
    componentWillReceiveProps({ sigma, nodes, edges }) {

        const sigma_node_ids = sigma.graph.nodes().map(n => n.id) || []
        const sigma_edge_ids = sigma.graph.edges().map(e => e.id) || []
        const my_edge_ids = edges.map(e => e.id) || []
        const my_node_ids = nodes.map(n => n.id) || []

        if (_.difference(my_edge_ids, sigma_edge_ids).length > 0 || _.difference(my_node_ids, sigma_node_ids).length > 0 || _.difference(sigma_edge_ids, my_edge_ids).length > 0 || _.difference(sigma_node_ids, my_node_ids).length > 0) {

            // NOTE: This is called FIRST purposefully. We drop the edges first, as we need to update their removed status in our store. Sigma automatically deletes Edges when a node is removed, and so we just forcefully remove them first here instead. That way, our store will contain the updated status of what is displayed. 
            if (sigma_edge_ids.filter(n => !my_edge_ids.includes(n)).length > 0) {
                // REMOVE EDGE
                const edgeToRemove = sigma_edge_ids.filter(n => !my_edge_ids.includes(n))
                if (edgeToRemove && edgeToRemove.length > 0) {
                    edgeToRemove.forEach(edge => sigma.graph.dropEdge(edge))
                }

            }

            if (sigma_node_ids.filter(n => !my_node_ids.includes(n)).length > 0) {
                // REMOVE NODE
                const nodeToRemove = sigma_node_ids.filter(n => !my_node_ids.includes(n))

                if (nodeToRemove && nodeToRemove.length > 0) {
                    nodeToRemove.forEach(node => sigma.graph.dropNode(node))
                }

            } else if (my_node_ids.filter(n => !sigma_node_ids.includes(n)).length > 0) {
                //  ADD NODE
                const nodeToAdd = nodes.filter(n => !sigma_node_ids.includes(n.id))
                if (nodeToAdd && nodeToAdd.length > 0) {
                    nodeToAdd.forEach(node => sigma.graph.addNode(node))
                }
            }

            if (my_edge_ids.filter(n => !sigma_edge_ids.includes(n)).length > 0) {
                //  ADD EDGE

                const edgeToAdd = edges.filter(n => !sigma_edge_ids.includes(n.id))
                if (edgeToAdd && edgeToAdd.length > 0) {
                    edgeToAdd.forEach(edge => sigma.graph.addEdge(edge))
                }
            }
        }
    }
    render = () => null
}

export default UpdateNodeProps;