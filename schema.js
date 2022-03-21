import { GraphQLObjectType, GraphQLNonNull, GraphQLSchema, GraphQLList, GraphQLInt } from "graphql";
import { CardType, ColumnType } from "/Users/Nikolaj/projects/graphql-apollo-server-workshop/types.js";
import { card_list, column_list } from "/Users/Nikolaj/projects/graphql-apollo-server-workshop/data.js";

export const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
            name: "query",
            fields: {
                columns: {
                    type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(ColumnType))),
                    resolve: () => {
                        return column_list;
                    }
                },
                cards: {
                    type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(CardType))),
                    resolve: () => {
                        return card_list;
                    }
                },
                column: {
                    type: ColumnType,
                    args: {
                        id: {
                            type: new GraphQLNonNull(GraphQLInt),
                        }
                    },
                    resolve: (root,args,context,info) => {
                        return { "column": column_list.find(column => column.id === args.id) }
                    }
                },
                card: {
                    type: CardType,
                    args: {
                        id: {
                            type: new GraphQLNonNull(GraphQLInt),
                        }
                    },
                    resolve: (root,args,context,info) => {
                        return { "card": card_list.find(card => card.id === args.id) }
                    }
                }
            },
        })
});