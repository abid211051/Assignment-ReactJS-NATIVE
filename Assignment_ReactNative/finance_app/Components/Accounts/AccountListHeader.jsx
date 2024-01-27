import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useIsFocused } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const AccountListHeader = () => {
    const isFocused = useIsFocused();
    const { incExp } = useSelector(state => state.incExp);
    const [ammount, setAmmount] = useState({
        income: 0,
        expense: 0,
        total: 0
    })
    useEffect(() => {
        if (isFocused) {
            let inc = 0;
            let exp = 0;
            for (const key in incExp) {
                if (incExp[key].type === "Income") {
                    inc += Number(incExp[key].ammount);
                }
                else if (incExp[key].type === "Expense") {
                    exp += Number(incExp[key].ammount);
                }
            }
            setAmmount({ income: inc, expense: exp, total: inc - exp });
        }
    }, [isFocused])
    return (
        <>
            <Text style={styles.headertext}>Overall</Text>
            <View style={styles.overallview}>
                <View style={styles.expInc}>
                    <View style={styles.exp}>
                        <Text style={styles.exptxt}>Expense</Text>
                        <Text style={styles.exptxt}>-{ammount.expense} ৳</Text>
                    </View>
                    <View style={styles.inc}>
                        <Text style={styles.inctext}>Income</Text>
                        <Text style={styles.inctext}>{ammount.income} ৳</Text>
                    </View>
                </View>
                <View style={styles.total}>
                    <Text style={[styles.totaltxt, ammount.total < 0 ? { color: 'red' } : { color: 'black' }]}>Total balance</Text>
                    <Text style={[styles.totaltxt, ammount.total < 0 ? { color: 'red' } : { color: 'black' }]}>{ammount.total} ৳</Text>
                </View>
            </View>
            <Text style={styles.headertext}>Accounts</Text>
        </>
    )
}

export default AccountListHeader;

const styles = StyleSheet.create({
    overallview: {
        width: '100%',
        marginVertical: 5,
        padding: 10,
    },
    headertext: {
        fontSize: 20,
        fontWeight: '700',
    },
    expInc: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        borderStyle: 'solid'
    },
    exp: {
        width: '50%',
        borderRightWidth: 1,
        borderRightColor: 'black',
        borderStyle: 'solid',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    inc: {
        width: '50%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    total: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    exptxt: {
        fontSize: 16,
        fontWeight: '600',
        color: 'red'
    },
    inctext: {
        fontSize: 16,
        fontWeight: '600',
        color: 'green'
    },
    totaltxt: {
        fontSize: 16,
        fontWeight: '600'
    }
})