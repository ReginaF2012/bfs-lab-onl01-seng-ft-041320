function bfs(rootNode, vertices, edges){
    // set the distance of the first node to 0
    rootNode.distance = 0
    // the queue starts with the rootNode and will have nodes added as they are discovered
    // and will work on a FIFO basis
    let queue = [rootNode]
    // visited is similar to the queue but items are never removed from this array, this is what we will be returning
    let visited = [rootNode]

    while(queue.length != 0){
        // FIFO, first node is the node we will be working with
        let currentNode = queue.shift()
        // find the adjacent nodes to the current node  
        let adjacentNodes = findAdjacent(currentNode.name, vertices, edges)
        // add them to the visited array
        visited = visited.concat(adjacentNodes);
        // assign their distance and predecessor property
        markDistanceAndPredecessor(currentNode, adjacentNodes)
        // add them to the queue
        queue = queue.concat(adjacentNodes)
    }
    // once the queue is empty, return the list of nodes in the order we visited them
    return visited
}

function findAdjacent(rootNodeName, vertices, edges){
    // find the edges that have the rootNode name
    // return the name of the node that's not the rootNode
    let adjacentNodeNames = edges.map(edge => {
        return edge.includes(rootNodeName) && edge.filter(name => name !== rootNodeName)[0]
    })
    // get the actual node from the name of the node
    return vertices.filter(vertex => {
        // only return if they haven't been 'queue', so if their distance is still null
        return adjacentNodeNames.includes(vertex.name) && vertex.distance === null
    })

}

function markDistanceAndPredecessor(predecessor, adjacentNodes){
    // for each of the adjacent nodes, assign their predecessor, and their distance to 1 more than the predecessor 
    adjacentNodes.map(node => {
      node.distance = predecessor.distance + 1;
      node.predecessor = predecessor;
    })
  }
