describe('poker game', function() {

    it('should be an object', function() {
        expect(poker).to.be.an('object');
    });

    describe('should be won', function() {

        describe('won by highest card', function() {

            describe('with different values', function() {

                it('should be won by white', function() {
                    expect(poker.play('2H 3D 5S 9C KD', '2C 3H 4S 8C AH')).to.be
                        .equals('White wins. - with high card: Ace');
                });

                it('should be won by black', function() {
                    expect(poker.play('2C 3H 4S 8C AH', '2H 3D 5S 9C KD')).to.be
                        .equals('Black wins. - with high card: Ace');
                });

                it('should be Tied', function() {
                    expect(poker.play('2C 3H 4S 8C AH', '2C 3H 4S 8C AH')).to.be
                        .equals('Tie.');
                });
            });

            describe('with same values', function() {

                it('should be won by black', function() {
                    expect(poker.play('2H 3D 5S 9C AH', '2C 3H 4S 8C AH')).to.be
                        .equals('Black wins. - with high card: 9');
                });

                it('should be won by white', function() {
                    expect(poker.play('2H AD JD QC 9H', '5H AD JS QC 9H')).to.be
                        .equals('White wins. - with high card: 5');
                });

            });

        });

        describe('won by pair', function() {

            describe('with a pair', function() {

                it('should be won by black', function() {
                    expect(poker.play('3H 3D 5S 9C AH', '2C 3H 4S QC AH')).to.be
                        .equals('Black wins. - with pair');
                });

                it('should be won by white', function() {
                    expect(poker.play('3H 2D 5S 9C AH', '2C 3H 3S QC AH')).to.be
                        .equals('White wins. - with pair');
                });

            });
            describe('with a higher pair', function() {

                it('should be won by black', function() {
                    expect(poker.play('3H 3D 5S 9C AH', '2C 2H 4S QC AH')).to.be
                        .equals('Black wins. - with pair');
                });

                it('should be won by white', function() {
                    expect(poker.play('2H 2D 5S 9C AH', '2C 3H 3S QC AH')).to.be
                        .equals('White wins. - with pair');
                });
            });

            describe('with same pair', function() {

                it('should be won by black with high card', function() {
                    expect(poker.play('2H 2D 5S 9C AH', '2C 2H 4S 8C AH')).to.be
                        .equals('Black wins. - with high card: 9');
                });

                it('should be won by white with high card', function() {
                    expect(poker.play('2H 2D 5S 9C 8H', '2C 2H 4S 3C QH')).to.be
                        .equals('White wins. - with high card: Queen');
                });

            });
        });

        describe('won by two pairs', function() {

            describe('with two pairs', function() {

                it('should be won by black', function() {
                    expect(poker.play('3H 3D 2S 2C AH', '2C 3H 4S QC AH')).to.be
                        .equals('Black wins. - with two pairs');
                });

                it('should be won by white', function() {
                    expect(poker.play('3H 3D 2S 4C AH', '2C 2H 4S 4C AH')).to.be
                        .equals('White wins. - with two pairs');
                });

            });

            describe('with a higher two pairs', function() {

                it('should be won by black', function() {
                    expect(poker.play('4H 4D 2S 2C AH', '3C 3H 2S 2C AH')).to.be
                        .equals('Black wins. - with two pairs');
                });

                it('should be won by white', function() {
                    expect(poker.play('4H 4D 2S 2C AH', '4C 4H 3S 3C AH')).to.be
                        .equals('White wins. - with two pairs');
                });

            });

            describe('with same two pairs', function() {

                it('should be won by black with high card', function() {
                    expect(poker.play('2H 2D 3S 3C AH', '2C 2H 3H 3S QH')).to.be
                        .equals('Black wins. - with high card: Ace');
                });

                it('should be won by white with high card', function() {
                    expect(poker.play('2H 2D 3S 3C JH', '2C 2H 3H 3S QH')).to.be
                        .equals('White wins. - with high card: Queen');
                });

            });

        });

        describe('won by three of a kind', function() {

            describe('with three of a kind', function() {

                it('should be won by black', function() {
                    expect(poker.play('4H 4D 4S 2C AH', '3C 3H 2S 2C AH')).to.be
                        .equals('Black wins. - with three of a kind');
                });

                it('should be won by white', function() {
                    expect(poker.play('4H 4D 2S 2C AH', '3C 3H 3S 2C AH')).to.be
                        .equals('White wins. - with three of a kind');
                });

            });

            describe('with a higher three of a kind', function() {

                it('should be won by black', function() {
                    expect(poker.play('4H 4D 4S 2C AH', '3C 3H 3S 2C AH')).to.be
                        .equals('Black wins. - with three of a kind');
                });

                it('should be won by white', function() {
                    expect(poker.play('4H 4D 4S 2C AH', '5C 5H 5S 2C AH')).to.be
                        .equals('White wins. - with three of a kind');
                });

            });

        });

        describe('won by a straight', function() {

            describe('with a straight', function() {

                it('should be won by black', function() {
                    expect(poker.play('AH 2D 3S 4C 5H', '3C 3H 2S 2C AH')).to.be
                        .equals('Black wins. - with straight');
                });

                it('should be won by white', function() {
                    expect(poker.play('3C 3H 2S 2C AH', 'AH 2D 3S 4C 5H')).to.be
                        .equals('White wins. - with straight');
                });

            });

            describe('with two straight', function() {

                it('should be won by black (highest card)', function() {
                    expect(poker.play('AH 2D 3S 4C 5H', '3C 4H 5S 6C 7H')).to.be
                        .equals('Black wins. - with straight');
                });

            });

        });

        describe('won by flush', function() {

            describe('with a flush', function() {

                it('should be won by black', function() {
                    expect(poker.play('AH 2H 3H 4H 6H', '3C 3H 2S 2C AH')).to.be
                        .equals('Black wins. - with flush');
                });

                it('should be won by white', function() {
                    expect(poker.play('AH 2D 3H 4H 5H', '3C 4C 2C 8C AC')).to.be
                        .equals('White wins. - with flush');
                });

            });

            describe('with two flush', function() {

                it('should be won by black (highest card)', function() {
                    expect(poker.play('AH 2H 3H 4H 6H', '3C 4H 5S 6C 7H')).to.be
                        .equals('Black wins. - with flush');
                });

            });

        });

        describe('won by full house', function() {

            describe('with a full house', function() {

                it('should be won by black', function() {
                    expect(poker.play('AH AS 3H 3C 3S', '3C 3H 2S 2C AH')).to.be
                        .equals('Black wins. - with full house');
                });

                it('should be won by white', function() {
                    expect(poker.play('3C 3H 2S 2C AH', 'AH AS 3H 3C 3S')).to.be
                        .equals('White wins. - with full house');
                });

            });

            describe('with two full house', function() {

                it('should be won by black (highest card of the three cards)', function() {
                    expect(poker.play('AH AS 3H 3C 3S', '3C 3H 2S 2C 2A')).to.be
                        .equals('Black wins. - with full house');
                });

            });

        });

        describe('won by four of a kind', function() {

            describe('with four of a kind', function() {

                it('should be won by black', function() {
                    expect(poker.play('4H 4D 4S 4C AH', '3C 3H 2S 2C AH')).to.be
                        .equals('Black wins. - with four of a kind');
                });

                it('should be won by white', function() {
                    expect(poker.play('4H 4D 2S 2C AH', '3C 3H 3S 3A AH')).to.be
                        .equals('White wins. - with four of a kind');
                });

            });

            describe('with a higher four of a kind', function() {

                it('should be won by black', function() {
                    expect(poker.play('4H 4D 4S 4C AH', '3C 3H 3S 3A AH')).to.be
                        .equals('Black wins. - with four of a kind');
                });

                it('should be won by white', function() {
                    expect(poker.play('4H 4D 4S 4C AH', '5C 5H 5S 5A AH')).to.be
                        .equals('White wins. - with four of a kind');
                });

            });

        });

        describe('won by a straight flush', function() {

            describe('with a straight flush', function() {

                it('should be won by black', function() {
                    expect(poker.play('AH 2H 3H 4H 5H', '3C 3H 2S 2C AH')).to.be
                        .equals('Black wins. - with straight flush');
                });

                it('should be won by white', function() {
                    expect(poker.play('3C 3H 2S 2C AH', 'AS 2S 3S 4S 5S')).to.be
                        .equals('White wins. - with straight flush');
                });

            });

            describe('with two straight flush', function() {

                it('should be won by black (highest card)', function() {
                    expect(poker.play('AH 2H 3H 4H 5H', '3C 4C 5C 6C 7C')).to.be
                        .equals('Black wins. - with straight flush');
                });

            });

        });

    });
});
