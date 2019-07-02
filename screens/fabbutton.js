,
         
           <FAB.Group
             fabStyle={{ backgroundColor: 'darkred'}}
             open={this.state.open}
             icon={this.state.open ? 'today' : 'alarm'}
             color='white'
             backgroundColor='red'
             
             actions={[
               
               { icon: 'alarm_on', label: 'HLF', onPress: () => console.log('Pressed add'), style : { backgroundColor: 'green', color: 'white'} },
               { icon: 'alarm_on', label: 'GWL', onPress: () => console.log('Pressed star'), style : { backgroundColor: 'green', color: 'white'} },
               { icon: 'alarm_on', label: 'KTW', onPress: () => console.log('Pressed email'), style : { backgroundColor: 'green', color: 'white'}  },
               { icon: 'alarm_off', label: 'nicht verfügbar', onPress: () => console.log('Pressed notifications'), style : { backgroundColor: 'red', color: 'white'}  },
             ]}
             onStateChange={({ open }) => this.setState({ open })}
             onPress={() => {
               if (this.state.open) {
                 // do something if the speed dial is open
               }
             }}
           />