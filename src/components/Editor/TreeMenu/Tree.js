import TreeMenu from 'react-simple-tree-menu'
import React, { useState ,useEffect } from 'react';
import axios from 'axios';

function Tree() {
    const treeData = [
        {
          key: 'node1',
          label: 'Node1',
          nodes: [
            {
              key: 'level1',
              label: 'Level1',
              nodes: [
                {
                  key: 'level2',
                  label: 'Level2',
                  nodes: [] // you can remove the nodes property or leave it as an empty array
                },
              ],
            },
          ],
        },
        {
          key: 'node2',
          label: 'Node2',
          nodes: [
            {
              key: 'level1',
              label: 'Level1'
            }
          ]
        },
        {
            key: 'node3',
            label: 'Node3',
            nodes: [
                {
                  key: 'level1',
                  label: 'Level1',
                  nodes: [
                    {
                      key: 'level2',
                      label: 'Level2',
                      nodes: [] // you can remove the nodes property or leave it as an empty array
                    },
                  ],
                },
              ]
          }
    ];
    return (
        <div>
              <TreeMenu data={treeData} />
        </div>
    );
}

export default Tree;