import React, { useState } from 'react';
import { View, Text, TouchableOpacity, LayoutAnimation, Platform, UIManager } from 'react-native';
import TabPanel from './TabPanel';
import styles from './styles';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const ComboBoxWithTabs = ({
  tabs = [],
  buttonLabel = 'Bilgileri Göster',
  initialTabKey,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState(initialTabKey || tabs?.[0]?.key);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={toggleExpand}>
        <Text style={styles.buttonText}>{buttonLabel}</Text>
      </TouchableOpacity>

      {expanded && (
        <View style={styles.collapseContainer}>
          <View style={styles.tabHeader}>
            {tabs.map((tab) => (
              <TouchableOpacity
                key={tab.key}
                style={[
                  styles.tabButton,
                  activeTab === tab.key && styles.activeTabButton,
                ]}
                onPress={() => setActiveTab(tab.key)}
              >
                <Text
                  style={[
                    styles.tabButtonText,
                    activeTab === tab.key && styles.activeTabButtonText,
                  ]}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.tabContent}>
            {tabs.map(
              (tab) =>
                activeTab === tab.key && (
                  <TabPanel key={tab.key}>{tab.content}</TabPanel>
                )
            )}
          </View>
        </View>
      )}
    </View>
  );
};

export default ComboBoxWithTabs;
