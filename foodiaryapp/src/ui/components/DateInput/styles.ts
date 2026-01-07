import { theme } from '@ui/styles/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 14,
  },
  text: {
    color: theme.colors.black[700],
    fontSize: 16,
    fontFamily: theme.fontFamily.sans.regular,
  },
  placeholder: {
    color: theme.colors.gray[700],
  },
  pickerContainer: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    backgroundColor: theme.colors.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.colors.gray[400],
    zIndex: 1000,
    shadowColor: theme.colors.black[700],
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  pickerHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[400],
    alignItems: 'flex-end',
  },
  picker: {
    backgroundColor: theme.colors.white,
  },
});
