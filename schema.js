import { GraphQLObjectType, GraphQLNonNull, GraphQLSchema, GraphQLList, GraphQLInt } from "graphql";
import { CardInputType, CardType, ColumnInputType, ColumnType } from "/Users/Nikolaj/projects/graphql-apollo-server-workshop/types.js";
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
                    resolve: (root, args) => {
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
                    resolve: (root, args) => {
                        return { "card": card_list.find(card => card.id === args.id) }
                    }
                }
            },
        }),
        mutation: new GraphQLObjectType({
            name: "Mutation",
            fields: {
                create_column: {
                    type: new GraphQLList(ColumnType),
                    args: {
                        input: {
                            type: ColumnInputType,
                        },
                    },
                    resolve: (root, args) => {
                        card_list.push(args.input);
                        return card_list;
                    }
                },
                update_card: {
                    type: CardType,
                    args: {
                        id: {
                            type: new GraphQLNonNull(GraphQLInt),
                        },
                        input: {
                            type: CardInputType,
                        },
                    },
                    resolve: (root, args) => {
                        let idx = card_list.findIndex(card => card.id === args.id);
                        card_list[idx] = args.input;
                        return card_list[idx];
                    }
                }
            }
        })
});