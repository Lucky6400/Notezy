import React, { useState } from 'react'
import { ScrollView, Text, TouchableOpacity } from 'react-native'
import { homeStyles } from '../../styles/homeStyles'
import { categoriesData } from '../../data/categories'

const Categories = ({ sel, setSel }) => {

    return (
        <ScrollView contentContainerStyle={{ height: 50, marginVertical: 20, paddingHorizontal: 10 }} horizontal>
            {categoriesData.map((cat, i) => (
                <TouchableOpacity
                    onPress={() => setSel(cat)}
                    key={i + cat} style={{ ...homeStyles.catBtn, backgroundColor: sel === cat ? "#0d78f2" : '#dbdbdb' }}>
                    <Text style={{ color: sel === cat ? "white" : 'black' }}>
                        {cat || "All"}
                    </Text>
                </TouchableOpacity>
            ))}

        </ScrollView>
    )
}

export default Categories