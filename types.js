import { GraphQLObjectType, GraphQLNonNull, GraphQLList, GraphQLInt, GraphQLString } from "graphql";
import { column_list, card_list } from "/Users/Nikolaj/projects/graphql-apollo-server-workshop/data.js";

export const CardType = new GraphQLObjectType({
    name: "Card",
    fields: () => ({
        id: {
            type: new GraphQLNonNull(GraphQLInt),
        },
        title: {
            type: new GraphQLNonNull(GraphQLString),
        },
        column_id: {
            type: GraphQLInt,
        },
        column: {    
            type: ColumnType,
            resolve: (source) => {
                return column_list.find(column => column.id === source.column_id)
            }
        },
    }),
});

export const ColumnType = new GraphQLObjectType({
    name: "Column",
    fields: () => ({
        id: {
            type: new GraphQLNonNull(GraphQLInt),
        },
        title: {
            type: new GraphQLNonNull(GraphQLString),
        },
        cards: {
            type: new GraphQLList(CardType),
            resolve: (source) => {
                return card_list.filter(card => card.id === source.id);
            }
        },
    }),
});